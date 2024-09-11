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
        Schema::create('prestaciones', function (Blueprint $table) {
            $table->id();
            $table->integer("id_empleado");
            $table->decimal("smmlv", 20)->default(0);
            $table->decimal("aux_transporte_mensual", 20)->default(0);
            $table->decimal("aux_transporte", 20)->default(0);
            $table->decimal("cesantias", 20)->default(0);
            $table->decimal("intereses_cesantias", 20)->default(0);
            $table->decimal("prima_legal", 20)->default(0);
            $table->decimal("vacaciones", 20)->default(0);
            $table->decimal("salud", 20)->default(0);
            $table->decimal("pension", 20)->default(0);
            $table->decimal("arl", 20)->default(0);
            $table->decimal("caja_compensacion_familiar", 20)->default(0);
            $table->decimal("fic", 20)->default(0);
            $table->decimal("icbf", 20)->default(0);
            $table->decimal("botas", 20)->default(0);
            $table->decimal("overol", 20)->default(0);
            $table->decimal("guantes", 20)->default(0);
            $table->decimal("gafas", 20)->default(0);
            $table->decimal("casco", 20)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestaciones');
    }
};
