<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciudades extends Model
{
    use HasFactory;

    protected $table = 'ciudades';

    protected $fillable = [
        'id_pais',
        'id_departamento',
        'codigo',
        'indicativo',
        'nombre',
        'nombre_completo',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at'
	];
}
