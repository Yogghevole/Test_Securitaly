<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dvd;
use Illuminate\Http\Request;

class DvdController extends Controller
{
    // Elenca tutti i DVD con copie disponibili
    public function index()
    {
        // Carica tutti i DVD e aggiunge l'accessor `copie_disponibili`
        $dvds = Dvd::all()->append('copie_disponibili');
        return response()->json($dvds);
    }
}