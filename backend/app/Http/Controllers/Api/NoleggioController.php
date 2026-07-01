<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dvd;
use App\Models\Noleggio;
use Illuminate\Http\Request;

class NoleggioController extends Controller
{
    // Elenca tutti i noleggi (con filtri opzionali)
    public function index(Request $request)
    {
        $query = Noleggio::with(['cliente', 'dvd']); // Carica anche cliente e dvd correlati

        // Filtro per cliente_id
        if ($request->has('cliente_id')) {
            $query->where('cliente_id', $request->cliente_id);
        }

        // Filtro per titolo DVD
        if ($request->has('titolo_dvd')) {
            $query->whereHas('dvd', function ($q) use ($request) {
                $q->where('titolo', 'like', '%' . $request->titolo_dvd . '%');
            });
        }

        $noleggi = $query->get()->append('is_attivo');
        return response()->json($noleggi);
    }

    // Crea un nuovo noleggio
    public function store(Request $request)
    {
        // Validazione
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clienti,id',
            'dvd_id' => 'required|exists:dvds,id',
            'data_noleggio' => 'required|date',
            'restituzione_prevista' => 'required|date|after_or_equal:data_noleggio',
        ]);

        // Controlla che il DVD abbia copie disponibili
        $dvd = Dvd::findOrFail($validated['dvd_id']);
        if ($dvd->copie_disponibili <= 0) {
            return response()->json(['message' => 'Nessuna copia disponibile per questo DVD'], 400);
        }

        // Crea il noleggio
        $noleggio = Noleggio::create($validated);

        // Carica le relazioni per la risposta
        $noleggio->load(['cliente', 'dvd'])->append('is_attivo');

        return response()->json($noleggio, 201);
    }

    // Segna un noleggio come restituito
    public function restituisci(int $id)
    {
        $noleggio = Noleggio::findOrFail($id);

        // Se è già restituito, non fare niente
        if (!is_null($noleggio->restituzione_effettiva)) {
            return response()->json(['message' => 'Noleggio già restituito'], 400);
        }

        // Imposta la data di restituzione a oggi
        $noleggio->update([
            'restituzione_effettiva' => now()->toDateString(),
        ]);

        $noleggio->load(['cliente', 'dvd'])->append('is_attivo');
        return response()->json($noleggio);
    }
}