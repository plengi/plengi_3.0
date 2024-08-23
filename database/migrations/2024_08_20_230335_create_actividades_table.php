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
        Schema::create('actividades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 200);
            $table->decimal('costo_directo', 20)->default(0);
            $table->decimal('costo_indirecto', 20)->default(0);
            $table->decimal('costo_total', 20)->default(0);
            $table->decimal('porcentaje_administracion', 20)->default(0);
            $table->decimal('porcentaje_imprevistos', 20)->default(0);
            $table->decimal('porcentaje_utilidad', 20)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actividades');
    }
};
