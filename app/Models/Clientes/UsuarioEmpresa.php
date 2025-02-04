<?php

namespace App\Models\Clientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioEmpresa extends Model
{
    use HasFactory;

    protected $connection = 'clientes';

    protected $table = 'usuario_empresas';

    protected $fillable = [
        'id_usuario',
        'id_empresa',
        'id_rol',
        'id_nit',
        'estado',
    ];
}
