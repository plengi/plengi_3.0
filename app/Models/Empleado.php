<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $fillable = [
        "id_proyecto",
        "nombre",
        "tipo",
        "salario",
    ];

    public function prestaciones()
    {
        return $this->hasMany(Prestaciones::class, "id_empleado");
    }
}
