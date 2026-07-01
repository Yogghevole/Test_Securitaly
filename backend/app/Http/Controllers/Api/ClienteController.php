<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    // Elenca tutti i clienti
    public function index()
    {
        $clienti = Cliente::all();
        return response()->json($clienti);
    }

    // Crea un nuovo cliente
    public function store(Request $request)
    {
        // Validazione dei dati
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'cognome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clienti,email',
        ]);

        // Crea il cliente
        $cliente = Cliente::create($validated);

        // Restituisce il cliente creato con codice 201 (Created)
        return response()->json($cliente, 201);
    }
}