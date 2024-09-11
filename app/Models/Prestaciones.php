<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestaciones extends Model
{
    use HasFactory;

    protected $fillable = [
        "id_empleado",
        "smmlv",
        "aux_transporte_mensual",
        "aux_transporte",
        "cesantias",
        "intereses_cesantias",
        "prima_legal",
        "vacaciones",
        "salud",
        "pension",
        "arl",
        "caja_compensacion_familiar",
        "fic",
        "icbf",
        "botas",
        "overol",
        "guantes",
        "gafas",
        "casco",
    ];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, "id_empleado");
    }
}
