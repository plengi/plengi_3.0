<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apu extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_proyecto',
        'nombre',
        'unidad_medida',
        'valor_total',
    ];

    public function detalles()
	{
		return $this->hasMany(ApuDetalle::class, 'id_apu');
	}
}
