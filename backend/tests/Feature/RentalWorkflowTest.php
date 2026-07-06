<?php

namespace Tests\Feature;

use App\Models\Cliente;
use App\Models\Dvd;
use App\Models\Noleggio;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RentalWorkflowTest extends TestCase
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

    public function test_it_creates_multiple_rentals_in_a_single_request(): void
    {
        $customer = $this->createCustomer();
        $dvdOne = $this->createDvd('Avatar', 2);
        $dvdTwo = $this->createDvd('Interstellar', 1);

        $response = $this->postJson('/api/noleggi', [
            'cliente_id' => $customer->id,
            'dvd_ids' => [$dvdOne->id, $dvdTwo->id],
            'data_noleggio' => '2026-07-06',
            'restituzione_prevista' => '2026-07-13',
        ]);

        $response
            ->assertCreated()
            ->assertJsonCount(2)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'cliente_id',
                    'dvd_id',
                    'data_noleggio',
                    'restituzione_prevista',
                    'cliente',
                    'dvd',
                ],
            ]);

        $this->assertDatabaseCount('noleggi', 2);
        $this->assertDatabaseHas('noleggi', [
            'cliente_id' => $customer->id,
            'dvd_id' => $dvdOne->id,
        ]);
        $this->assertDatabaseHas('noleggi', [
            'cliente_id' => $customer->id,
            'dvd_id' => $dvdTwo->id,
        ]);
    }

    public function test_it_rejects_a_rental_when_no_copy_is_available(): void
    {
        $customer = $this->createCustomer();
        $dvd = $this->createDvd('Mulan', 1);

        Noleggio::create([
            'cliente_id' => $customer->id,
            'dvd_id' => $dvd->id,
            'data_noleggio' => '2026-07-01',
            'restituzione_prevista' => '2026-07-08',
        ]);

        $response = $this->postJson('/api/noleggi', [
            'cliente_id' => $customer->id,
            'dvd_ids' => [$dvd->id],
            'data_noleggio' => '2026-07-06',
            'restituzione_prevista' => '2026-07-13',
        ]);

        $response
            ->assertStatus(400)
            ->assertJsonPath('message', "Nessuna copia disponibile per il DVD con ID {$dvd->id}");
    }

    public function test_it_registers_multiple_returns_in_a_single_request(): void
    {
        $customer = $this->createCustomer();
        $dvdOne = $this->createDvd('Green Book', 2);
        $dvdTwo = $this->createDvd('Cars - Motori Ruggenti', 2);

        $rentalOne = Noleggio::create([
            'cliente_id' => $customer->id,
            'dvd_id' => $dvdOne->id,
            'data_noleggio' => '2026-07-01',
            'restituzione_prevista' => '2026-07-05',
        ]);

        $rentalTwo = Noleggio::create([
            'cliente_id' => $customer->id,
            'dvd_id' => $dvdTwo->id,
            'data_noleggio' => '2026-07-02',
            'restituzione_prevista' => '2026-07-06',
        ]);

        $response = $this->postJson('/api/noleggi/restituzioni', [
            'noleggio_ids' => [$rentalOne->id, $rentalTwo->id],
            'data_restituzione' => '2026-07-06',
        ]);

        $response
            ->assertOk()
            ->assertJsonCount(2);

        $this->assertDatabaseHas('noleggi', [
            'id' => $rentalOne->id,
            'restituzione_effettiva' => '2026-07-06',
        ]);
        $this->assertDatabaseHas('noleggi', [
            'id' => $rentalTwo->id,
            'restituzione_effettiva' => '2026-07-06',
        ]);
    }

    private function createCustomer(): Cliente
    {
        return Cliente::create([
            'nome' => 'Mario',
            'cognome' => 'Rossi',
            'email' => 'mario.rossi@example.com',
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
