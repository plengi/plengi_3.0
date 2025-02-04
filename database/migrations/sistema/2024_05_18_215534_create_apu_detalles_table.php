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
        Schema::create('apu_detalles', function (Blueprint $table) {
            $table->id();
            $table->integer('id_apu');
            $table->integer('id_producto');
            $table->decimal('cantidad', 20)->default(0);
            $table->decimal('cantidad_total', 20)->default(0);
            $table->decimal('costo', 20)->default(0);
            $table->decimal('desperdicio', 20)->default(0);
            $table->decimal('rendimiento', 20)->default(0);
            $table->decimal('distancia', 20)->default(0);
            $table->decimal('prestaciones', 20)->default(0);
            $table->decimal('total', 20)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apu_detalles');
    }
};
