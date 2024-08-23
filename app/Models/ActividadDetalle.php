<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActividadDetalle extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_actividad',
        'codigo_tarjeta',
        'nombre_tarjeta',
        'id_apu',
        'cantidad',
        'valor_unidad',
        'valor_total',
    ];

    public function apu()
	{
		return $this->belongsTo(Apu::class, 'id_apu');
	}
}