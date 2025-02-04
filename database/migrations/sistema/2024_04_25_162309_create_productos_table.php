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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->integer('id_proyecto')->nullable();
            $table->integer('tipo_proveedor')->nullable();
            $table->string('nombre', 100)->nullable();
            $table->string('unidad_medida', 100)->nullable();
            $table->integer('tipo_producto')->default(0)->nullable()->commet('0 - Materiales; 1 - Equipo; 2 - Mano de obra;');
            $table->decimal('valor', 20)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
