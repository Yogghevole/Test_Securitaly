<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dvd;

class DvdController extends Controller
{
    // Elenca tutti i DVD con copie disponibili
    public function index()
    {
        $dvds = Dvd::query()
            ->withCount([
                'noleggi as active_rentals_count' => function ($query) {
                    $query->whereNull('restituzione_effettiva');
                },
            ])
            ->orderBy('titolo')
            ->get();

        return response()->json($dvds);
    }
}
