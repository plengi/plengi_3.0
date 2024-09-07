<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//MODELS
use App\Models\Paises;
use App\Models\Ciudades;
use App\Models\Departamentos;

class UbicacionController extends Controller
{
    public function getCiudad (Request $request)
    {
        $queryModel = Ciudades::whereNotNull("id")->select(
            'id',
            'id_pais',
            'id_departamento',
            'codigo',
            'indicativo',
            'nombre',
            'nombre_completo',
            \DB::raw("nombre_completo as text")
        );

        if($request->get("search")){
            $queryModel->where("nombre","LIKE","%".$request->get("search")."%");
        }

        return $queryModel->paginate(30);
    }
}
