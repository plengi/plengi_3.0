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
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('token_db', 200)->nullable();
            $table->string('razon_social', 120)->nullable();
            $table->string('email', 120)->nullable();
            $table->string('nit', 120)->nullable();
            $table->string('dv', 120)->nullable();
            $table->string('telefono', 120)->nullable();
            $table->string('direccion', 120)->nullable();
            $table->string('hash', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
