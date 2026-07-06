<?php

namespace Tests\Feature;

use App\Models\Cliente;
use App\Models\Dvd;
use App\Models\Noleggio;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectReadModelsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-07-06 10:00:00');
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    public function test_dvds_endpoint_returns_computed_available_copies(): void
    {
        $customer = $this->createCustomer('Luca', 'Bianchi', 'luca.bianchi@example.com');
        $avatar = $this->createDvd('Avatar', 3);
        $mulan = $this->createDvd('Mulan', 1);

        Noleggio::create([
            'cliente_id' => $customer->id,
            'dvd_id' => $avatar->id,
            'data_noleggio' => '2026-07-01',
            'restituzione_prevista' => '2026-07-08',
        ]);

        $response = $this->getJson('/api/dvds');

        $response->assertOk();

        $payload = collect($response->json())->keyBy('titolo');

        $this->assertSame(2, $payload['Avatar']['copie_disponibili']);
        $this->assertSame(1, $payload['Mulan']['copie_disponibili']);
    }

    public function test_customer_detail_orders_completed_rentals_by_last_activity(): void
    {
        $customer = $this->createCustomer('Giulia', 'Verdi', 'giulia.verdi@example.com');
        $oldMovie = $this->createDvd('Fight Club', 1);
        $newMovie = $this->createDvd('Interstellar', 1);

        $olderRental = Noleggio::create([
            'cliente_id' => $customer->id,
            'dvd_id' => $oldMovie->id,
            'data_noleggio' => '2026-06-01',
            'restituzione_prevista' => '2026-06-08',
            'restituzione_effettiva' => '2026-07-06',
        ]);

        $newerRental = Noleggio::create([
            'cliente_id' => $customer->id,
            'dvd_id' => $newMovie->id,
            'data_noleggio' => '2026-06-20',
            'restituzione_prevista' => '2026-06-27',
            'restituzione_effettiva' => '2026-06-27',
        ]);

        $olderRental->timestamps = false;
        $olderRental->forceFill([
            'created_at' => '2026-06-01 10:00:00',
            'updated_at' => '2026-07-06 12:00:00',
        ])->save();

        $newerRental->timestamps = false;
        $newerRental->forceFill([
            'created_at' => '2026-06-20 10:00:00',
            'updated_at' => '2026-06-27 12:00:00',
        ])->save();

        $response = $this->getJson("/api/clienti/{$customer->id}");

        $response
            ->assertOk()
            ->assertJsonPath('rental_history.0.id', $olderRental->id)
            ->assertJsonPath('rental_history.1.id', $newerRental->id);
    }

    public function test_dashboard_returns_today_and_need_attention_data(): void
    {
        $todayCustomer = $this->createCustomer('Anna', 'Neri', 'anna.neri@example.com');
        $overdueCustomer = $this->createCustomer('Paolo', 'Blu', 'paolo.blu@example.com');
        $todayDvd = $this->createDvd('Ratatouille', 2);
        $overdueDvdOne = $this->createDvd('Green Book', 2);
        $overdueDvdTwo = $this->createDvd('Cars - Motori Ruggenti', 2);

        Noleggio::create([
            'cliente_id' => $todayCustomer->id,
            'dvd_id' => $todayDvd->id,
            'data_noleggio' => '2026-07-02',
            'restituzione_prevista' => '2026-07-06',
        ]);

        Noleggio::create([
            'cliente_id' => $overdueCustomer->id,
            'dvd_id' => $overdueDvdOne->id,
            'data_noleggio' => '2026-06-28',
            'restituzione_prevista' => '2026-07-03',
        ]);

        Noleggio::create([
            'cliente_id' => $overdueCustomer->id,
            'dvd_id' => $overdueDvdTwo->id,
            'data_noleggio' => '2026-06-27',
            'restituzione_prevista' => '2026-07-04',
        ]);

        $response = $this->getJson('/api/dashboard');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'today_returns')
            ->assertJsonCount(1, 'need_attention')
            ->assertJsonPath('today_returns.0.cliente.id', $todayCustomer->id)
            ->assertJsonPath('need_attention.0.customer.id', $overdueCustomer->id)
            ->assertJsonPath('need_attention.0.overdue_rentals_count', 2)
            ->assertJsonPath('need_attention.0.max_delay_days', 3);
    }

    private function createCustomer(string $firstName, string $lastName, string $email): Cliente
    {
        return Cliente::create([
            'nome' => $firstName,
            'cognome' => $lastName,
            'email' => $email,
        ]);
    }

    private function createDvd(string $title, int $quantity): Dvd
    {
        return Dvd::create([
            'titolo' => $title,
            'data_di_uscita' => '2000-01-01',
            'categoria' => 'Drammatico',
            'durata_minuti' => 120,
            'quantita' => $quantity,
        ]);
    }
}
