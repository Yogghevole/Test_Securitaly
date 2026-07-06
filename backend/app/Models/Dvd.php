<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dvd extends Model
{
    protected $table = 'dvds';

    protected $appends = [
        'copie_disponibili',
    ];

    protected $fillable = [
        'titolo',
        'data_di_uscita',
        'categoria',
        'durata_minuti',
        'quantita',
        'cover_path',
    ];

    // Relazione: un DVD ha molti noleggi
    public function noleggi(): HasMany
    {
        return $this->hasMany(Noleggio::class);
    }

    // Accessor per calcolare le copie disponibili (quantita - noleggi attivi)
    public function getCopieDisponibiliAttribute()
    {
        $noleggiAttivi = $this->attributes['active_rentals_count']
            ?? $this->noleggi()->whereNull('restituzione_effettiva')->count();

        return max(0, $this->quantita - $noleggiAttivi);
    }
}
