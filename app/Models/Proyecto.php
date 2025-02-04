<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//MODELS
use App\Models\Clientes\Ciudades;

class Proyecto extends Model
{
    use HasFactory;

	protected $connection = 'plengi';

    protected $table = 'proyectos';

	protected $fillable = [
		'id_ciudad',
        'tipo_obra',
        'nombre',
        'fecha',
	];

    public function ciudad()
	{
		return $this->belongsTo(Ciudades::class, 'id_ciudad');
	}

    public function actividad()
	{
		return $this->belongsTo(Actividades::class, 'id', 'id_proyecto');
	}
}
