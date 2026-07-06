<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dvd;
use App\Models\Noleggio;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clienti,id',
            'dvd_ids' => 'nullable|array|min:1',
            'dvd_ids.*' => 'integer|distinct|exists:dvds,id',
            'dvd_id' => 'nullable|integer|exists:dvds,id',
            'data_noleggio' => 'required|date',
            'restituzione_prevista' => 'required|date|after_or_equal:data_noleggio',
        ]);

        $dvdIds = $validated['dvd_ids'] ?? [];

        if (empty($dvdIds) && isset($validated['dvd_id'])) {
            $dvdIds = [$validated['dvd_id']];
        }

        if (empty($dvdIds)) {
            throw new HttpResponseException(response()->json([
                'message' => 'Il campo dvd_ids è obbligatorio e deve contenere almeno un ID valido',
            ], 422));
        }

        $createdRentals = DB::transaction(function () use ($validated, $dvdIds) {
            $dvds = Dvd::query()
                ->whereIn('id', $dvdIds)
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            $requestedQuantities = collect($dvdIds)->countBy();

            foreach ($dvdIds as $dvdId) {
                $dvd = $dvds->get($dvdId);

                if (
                    !$dvd ||
                    $dvd->copie_disponibili < $requestedQuantities->get($dvdId, 0)
                ) {
                    throw new HttpResponseException(response()->json([
                        'message' => "Nessuna copia disponibile per il DVD con ID {$dvdId}",
                    ], 400));
                }
            }

            $rentals = new EloquentCollection();

            foreach ($dvdIds as $dvdId) {
                $rentals->push(Noleggio::create([
                    'cliente_id' => $validated['cliente_id'],
                    'dvd_id' => $dvdId,
                    'data_noleggio' => $validated['data_noleggio'],
                    'restituzione_prevista' => $validated['restituzione_prevista'],
                ]));
            }

            return $rentals;
        });

        $this->loadRentalsRelations($createdRentals);

        return response()->json($createdRentals, 201);
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

    // Registra la restituzione multipla di noleggi attivi
    public function restituzioni(Request $request)
    {
        $validated = $request->validate([
            'noleggio_ids' => 'required|array|min:1',
            'noleggio_ids.*' => 'integer|distinct|exists:noleggi,id',
            'data_restituzione' => 'required|date',
        ]);

        $updatedRentals = DB::transaction(function () use ($validated) {
            $rentals = Noleggio::query()
                ->whereIn('id', $validated['noleggio_ids'])
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            $updated = new EloquentCollection();

            foreach ($validated['noleggio_ids'] as $rentalId) {
                $rental = $rentals->get($rentalId);

                if (!$rental || !is_null($rental->restituzione_effettiva)) {
                    throw new HttpResponseException(response()->json([
                        'message' => "Il noleggio con ID {$rentalId} non è più attivo",
                    ], 400));
                }

                $rental->update([
                    'restituzione_effettiva' => $validated['data_restituzione'],
                ]);

                $updated->push($rental);
            }

            return $updated;
        });

        $this->loadRentalsRelations($updatedRentals);

        return response()->json($updatedRentals);
    }

    private function loadRentalsRelations(EloquentCollection $rentals): void
    {
        $rentals->load(['cliente', 'dvd'])->each->append('is_attivo');
    }
}
