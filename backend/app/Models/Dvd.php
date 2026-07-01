<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dvd extends Model
{
    protected $table = 'dvds';

    protected $fillable = [
        'titolo',
        'data_di_uscita',
        'categoria',
        'durata_minuti',
        'quantita',
    ];

    // Relazione: un DVD ha molti noleggi
    public function noleggi(): HasMany
    {
        return $this->hasMany(Noleggio::class);
    }

    // Accessor per calcolare le copie disponibili (quantita - noleggi attivi)
    public function getCopieDisponibiliAttribute()
    {
        // Noleggi attivi = restituzione_effettiva IS NULL
        $noleggiAttivi = $this->noleggi()->whereNull('restituzione_effettiva')->count();
        return max(0, $this->quantita - $noleggiAttivi);
    }
}