<?php

use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\DvdController;
use App\Http\Controllers\Api\NoleggioController;
use Illuminate\Support\Facades\Route;

// Rotte Clienti
Route::get('/clienti', [ClienteController::class, 'index']);
Route::post('/clienti', [ClienteController::class, 'store']);

// Rotte DVD
Route::get('/dvds', [DvdController::class, 'index']);

// Rotte Noleggi
Route::get('/noleggi', [NoleggioController::class, 'index']);
Route::post('/noleggi', [NoleggioController::class, 'store']);
Route::put('/noleggi/{id}/restituisci', [NoleggioController::class, 'restituisci']);