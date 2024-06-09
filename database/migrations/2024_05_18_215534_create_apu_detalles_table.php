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
            $table->integer('cantidad');
            $table->integer('costo');
            $table->integer('desperdicio');
            $table->integer('total');
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
