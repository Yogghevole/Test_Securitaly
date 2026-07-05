<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Noleggio;

class DashboardController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        $returnsToday = Noleggio::query()
            ->whereNull('restituzione_effettiva')
            ->whereDate('restituzione_prevista', $today)
            ->count();

        $lateReturns = Noleggio::query()
            ->whereNull('restituzione_effettiva')
            ->whereDate('restituzione_prevista', '<', $today)
            ->count();

        $recentRentals = Noleggio::query()
            ->with(['cliente', 'dvd'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(function (Noleggio $noleggio) {
                $noleggio->append('is_attivo');

                return [
                    'type' => 'rental',
                    'date' => $noleggio->created_at,
                    'rental' => $noleggio,
                ];
            });

        $recentReturns = Noleggio::query()
            ->with(['cliente', 'dvd'])
            ->whereNotNull('restituzione_effettiva')
            ->orderByDesc('restituzione_effettiva')
            ->limit(5)
            ->get()
            ->map(function (Noleggio $noleggio) {
                $noleggio->append('is_attivo');

                return [
                    'type' => 'return',
                    'date' => $noleggio->restituzione_effettiva,
                    'rental' => $noleggio,
                ];
            });

        $recentActivity = $recentRentals
            ->concat($recentReturns)
            ->sortByDesc('date')
            ->values()
            ->take(10);

        return response()->json([
            'returns_today' => $returnsToday,
            'late_returns' => $lateReturns,
            'need_attention' => $returnsToday + $lateReturns,
            'recent_activity' => $recentActivity,
        ]);
    }
}
