<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Dvd;
use App\Models\Noleggio;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class RentalSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Cliente::query()->orderBy('id')->get();
        $dvds = Dvd::query()->orderBy('id')->get();

        if ($customers->isEmpty() || $dvds->isEmpty()) {
            return;
        }

        $today = Carbon::today();
        $dvdByTitle = $dvds->keyBy('titolo');

        $createRental = function (
            Cliente $customer,
            Dvd $dvd,
            Carbon $rentalDate,
            Carbon $expectedReturn,
            ?Carbon $actualReturn = null,
        ): void {
            $rental = $customer->noleggi()->make([
                'dvd_id' => $dvd->id,
                'data_noleggio' => $rentalDate->toDateString(),
                'restituzione_prevista' => $expectedReturn->toDateString(),
                'restituzione_effettiva' => $actualReturn?->toDateString(),
            ]);

            $rental->timestamps = false;
            $rental->created_at = $rentalDate->copy()->setTime(10, 0);
            $rental->updated_at = ($actualReturn ?? $rentalDate)->copy()->setTime(12, 0);
            $rental->save();
        };

        $customerByEmail = $customers->keyBy('email');
        $excludedCustomer = $customerByEmail->get('sophia.moore@example.com');
        $emma = $customerByEmail->get('emma.johnson@example.com') ?? $customers->first();
        $liam = $customerByEmail->get('liam.williams@example.com') ?? $customers->get(1) ?? $customers->first();
        $olivia = $customerByEmail->get('olivia.brown@example.com') ?? $customers->get(2) ?? $customers->first();
        $noah = $customerByEmail->get('noah.davis@example.com') ?? $customers->get(3) ?? $customers->first();
        $ava = $customerByEmail->get('ava.miller@example.com') ?? $customers->get(4) ?? $customers->first();
        $james = $customerByEmail->get('james.taylor@example.com') ?? $customers->get(6) ?? $customers->first();

        $greenBook = $dvdByTitle->get('Green Book');
        $cars = $dvdByTitle->get('Cars - Motori Ruggenti');
        $ratatouille = $dvdByTitle->get('Ratatouille');
        $fightClub = $dvdByTitle->get('Fight Club');
        $mulan = $dvdByTitle->get('Mulan');
        $interstellar = $dvdByTitle->get('Interstellar');
        $avatar = $dvdByTitle->get('Avatar');

        $fallbackDvd = $dvds->first();

        $todayReturnsDvds = collect([
            $greenBook,
            $greenBook,
            $cars,
        ])->map(fn ($dvd) => $dvd ?? $fallbackDvd);

        $dueSoonDvds = collect([
            $ratatouille,
            $fightClub,
        ])->map(fn ($dvd) => $dvd ?? $fallbackDvd);

        $overdueDvds = collect([
            $mulan,
            $interstellar,
        ])->map(fn ($dvd) => $dvd ?? $fallbackDvd);

        $onTimeDvd = $avatar ?? $fallbackDvd;

        $activePlan = [
            ['customer' => $emma, 'dvd' => $todayReturnsDvds->get(0), 'expected' => $today->copy(), 'rental' => $today->copy()->subDays(5)],
            ['customer' => $emma, 'dvd' => $todayReturnsDvds->get(1), 'expected' => $today->copy(), 'rental' => $today->copy()->subDays(2)],
            ['customer' => $liam, 'dvd' => $todayReturnsDvds->get(2), 'expected' => $today->copy(), 'rental' => $today->copy()->subDays(3)],
            ['customer' => $olivia, 'dvd' => $dueSoonDvds->get(0), 'expected' => $today->copy()->addDays(2), 'rental' => $today->copy()->subDays(4)],
            ['customer' => $noah, 'dvd' => $dueSoonDvds->get(1), 'expected' => $today->copy()->addDays(1), 'rental' => $today->copy()->subDays(6)],
            ['customer' => $ava, 'dvd' => $overdueDvds->get(0), 'expected' => $today->copy()->subDays(2), 'rental' => $today->copy()->subDays(10)],
            ['customer' => $james, 'dvd' => $overdueDvds->get(1), 'expected' => $today->copy()->subDays(1), 'rental' => $today->copy()->subDays(8)],
            ['customer' => $emma, 'dvd' => $onTimeDvd, 'expected' => $today->copy()->addDays(7), 'rental' => $today->copy()->subDays(1)],
        ];

        $dvdActiveCounts = [];

        foreach ($activePlan as $entry) {
            $dvdId = $entry['dvd']->id;
            $dvdActiveCounts[$dvdId] = ($dvdActiveCounts[$dvdId] ?? 0) + 1;

            if ($dvdActiveCounts[$dvdId] > $entry['dvd']->quantita) {
                $dvdReplacement = $dvds
                    ->filter(function (Dvd $dvd) use ($dvdActiveCounts) {
                        return ($dvdActiveCounts[$dvd->id] ?? 0) < $dvd->quantita;
                    })
                    ->first() ?? $fallbackDvd;

                $entry['dvd'] = $dvdReplacement;
                $dvdId = $dvdReplacement->id;
                $dvdActiveCounts[$dvdId] = ($dvdActiveCounts[$dvdId] ?? 0) + 1;
            }

            $createRental(
                $entry['customer'],
                $entry['dvd'],
                $entry['rental'],
                $entry['expected'],
                null,
            );
        }

        $eligibleCompletedCustomers = $customers
            ->filter(function (Cliente $customer) use ($excludedCustomer) {
                if (!$excludedCustomer) {
                    return true;
                }

                return $customer->id !== $excludedCustomer->id;
            })
            ->values();

        $completedCustomers = $eligibleCompletedCustomers->shuffle()->values();
        $completedDvds = $dvds->shuffle()->values();

        $completedPlan = $this->buildCompletedPlan($today, $completedCustomers, $completedDvds);

        foreach ($completedPlan as $entry) {
            $createRental(
                $entry['customer'],
                $entry['dvd'],
                $entry['rental'],
                $entry['expected'],
                $entry['actual'],
            );
        }
    }

    private function buildCompletedPlan(Carbon $today, Collection $customers, Collection $dvds): array
    {
        $plan = [];

        $ensureCustomers = $customers->take(4)->values();

        foreach ($ensureCustomers as $index => $customer) {
            $dvd = $dvds->get($index) ?? $dvds->first();
            $rentalDate = $today->copy()->subDays(45 + ($index * 3));
            $expectedReturn = $rentalDate->copy()->addDays(7);
            $actualReturn = $expectedReturn->copy();

            if ($index % 2 === 1) {
                $actualReturn = $expectedReturn->copy()->addDays(3);
            }

            $plan[] = [
                'customer' => $customer,
                'dvd' => $dvd,
                'rental' => $rentalDate,
                'expected' => $expectedReturn,
                'actual' => $actualReturn,
            ];
        }

        while (count($plan) < 12) {
            $customer = $customers->random();
            $dvd = $dvds->random();

            $rentalDate = $today->copy()->subDays(random_int(20, 120));
            $expectedReturn = $rentalDate->copy()->addDays(7);

            $isLate = count($plan) % 3 === 0;
            $delayDays = $isLate ? random_int(1, 6) : 0;
            $actualReturn = $expectedReturn->copy()->addDays($delayDays);

            if ($actualReturn->greaterThanOrEqualTo($today)) {
                $actualReturn = $today->copy()->subDays(1);
            }

            $plan[] = [
                'customer' => $customer,
                'dvd' => $dvd,
                'rental' => $rentalDate,
                'expected' => $expectedReturn,
                'actual' => $actualReturn,
            ];
        }

        return $plan;
    }
}
