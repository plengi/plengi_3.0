<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_proyecto',
        'tipo_proveedor',
        'nombre',
        'unidad_medida',
        'tipo_producto',
        'valor',
    ];
}
