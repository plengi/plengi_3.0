<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApuDetalle extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_apu',
        'id_producto',
        'cantidad',
        'cantidad_total',
        'costo',
        'desperdicio',
        'rendimiento',
        'prestaciones',
        'total',
    ];

    public function apu()
	{
		return $this->belongsTo(Apu::class, 'id_apu');
	}

    public function producto()
	{
		return $this->belongsTo(Productos::class, 'id_producto');
	}
}
