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
        Schema::create('apus', function (Blueprint $table) {
            $table->id();
            $table->integer('id_proyecto')->nullable();
            $table->string('nombre', 200);
            $table->string('unidad_medida', 100)->nullable();
            $table->string('valor_total', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apus');
    }
};
