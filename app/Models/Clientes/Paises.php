<?php

namespace App\Models\Clientes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paises extends Model
{
    use HasFactory;

	protected $connection = 'clientes';

    protected $table = 'paises';

	protected $fillable = [
		'id',
		'nombre'
	];
}
