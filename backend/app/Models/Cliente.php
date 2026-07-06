<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cliente extends Model
{
    protected $table = 'clienti';

    protected $fillable = [
        'nome',
        'cognome',
        'email',
    ];

    
    //Relazione: un cliente ha molti noleggi
    public function noleggi(): HasMany
    {
        return $this->hasMany(Noleggio::class);
    }
}