<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('noleggi', function (Blueprint $table) {
        $table->id();
        $table->foreignId('cliente_id')->constrained('clienti')->onDelete('cascade');
        $table->foreignId('dvd_id')->constrained('dvds')->onDelete('cascade');
        $table->date('data_noleggio');
        $table->date('restituzione_prevista');
        $table->date('restituzione_effettiva')->nullable();
        $table->timestamps();
    });
}

    public function down(): void
    {
        Schema::dropIfExists('noleggi');
    }
};