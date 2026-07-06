<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Noleggio;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();
        $todayDate = now()->startOfDay();

        $todayReturns = Noleggio::query()
            ->with(['cliente', 'dvd'])
            ->whereNull('restituzione_effettiva')
            ->whereDate('restituzione_prevista', $today)
            ->orderBy('restituzione_prevista')
            ->get()
            ->sortBy(fn (Noleggio $rental) => sprintf(
                '%s|%s|%s',
                strtolower($rental->dvd?->titolo ?? ''),
                strtolower($rental->cliente?->cognome ?? ''),
                strtolower($rental->cliente?->nome ?? '')
            ))
            ->values()
            ->each->append('is_attivo');

        $overdueRentals = Noleggio::query()
            ->with(['cliente'])
            ->whereNull('restituzione_effettiva')
            ->whereDate('restituzione_prevista', '<', $today)
            ->get()
            ->each->append('is_attivo');

        $needAttention = $overdueRentals
            ->groupBy('cliente_id')
            ->map(function ($rentals) use ($todayDate) {
                /** @var Noleggio $firstRental */
                $firstRental = $rentals->first();
                /** @var Cliente|null $customer */
                $customer = $firstRental?->cliente;

                if (!$customer) {
                    return null;
                }

                return [
                    'customer' => $customer,
                    'max_delay_days' => $rentals->max(
                        fn (Noleggio $rental) => Carbon::parse($rental->restituzione_prevista)
                            ->startOfDay()
                            ->diffInDays($todayDate)
                    ),
                    'overdue_rentals_count' => $rentals->count(),
                ];
            })
            ->filter()
            ->sortByDesc('max_delay_days')
            ->values();

        return response()->json([
            'today_returns' => $todayReturns,
            'need_attention' => $needAttention,
        ]);
    }
}
