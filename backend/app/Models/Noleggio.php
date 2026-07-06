<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Noleggio extends Model
{
    protected $table = 'noleggi';

    protected $fillable = [
        'cliente_id',
        'dvd_id',
        'data_noleggio',
        'restituzione_prevista',
        'restituzione_effettiva',
    ];

    // Relazione: un noleggio appartiene a un cliente
    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    // Relazione: un noleggio appartiene a un DVD
    public function dvd(): BelongsTo
    {
        return $this->belongsTo(Dvd::class);
    }

    // Accessor per sapere se è attivo
    public function getIsAttivoAttribute()
    {
        return is_null($this->restituzione_effettiva);
    }
}