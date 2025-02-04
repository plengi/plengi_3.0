<?php

namespace App\Models\Clientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $connection = 'clientes';

    protected $table = 'empresas';

    protected $fillable = [
        'token_db',
        'razon_social',
        'email',
        'telefono',
        'direccion',
        'nit',
        'dv',
        'hash',
    ];
}
