<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('actividad_detalles', function (Blueprint $table) {
            $table->id();
            $table->string('id_actividad');
            $table->string('nombre_tarjeta', 200)->default('');
            $table->string('codigo_tarjeta', 200)->default('');
            $table->string('id_apu');
            $table->decimal('cantidad', 20)->default(0);
            $table->decimal('valor_unidad', 20)->default(0);
            $table->decimal('valor_total', 20)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actividad_detalles');
    }
};
