<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actividades extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'costo_directo',
        'costo_indirecto',
        'costo_total'
    ];

    public function detalles()
    {
		return $this->hasMany(ActividadDetalle::class, 'id_actividad');
	}

}