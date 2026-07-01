<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dvds', function (Blueprint $table) {
            $table->id();
            $table->string('titolo');
            $table->date('data_di_uscita');
            $table->string('categoria');
            $table->integer('durata_minuti');
            $table->integer('quantita');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dvds');
    }
};