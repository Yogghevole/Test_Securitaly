<?php

use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DvdController;
use App\Http\Controllers\Api\NoleggioController;
use Illuminate\Support\Facades\Route;

// Rotta Dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);

// Rotte Clienti
Route::get('/clienti', [ClienteController::class, 'index']);
Route::get('/clienti/{id}', [ClienteController::class, 'show']);
Route::post('/clienti', [ClienteController::class, 'store']);
Route::put('/clienti/{id}', [ClienteController::class, 'update']);

// Rotte DVD
Route::get('/dvds', [DvdController::class, 'index']);

// Rotte Noleggi
Route::get('/noleggi', [NoleggioController::class, 'index']);
Route::post('/noleggi', [NoleggioController::class, 'store']);
Route::post('/noleggi/restituzioni', [NoleggioController::class, 'restituzioni']);
Route::put('/noleggi/{id}/restituisci', [NoleggioController::class, 'restituisci']);
