<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//MODELS
use App\Models\User;
use App\Models\Proyecto;
use App\Models\Actividades;

class HomeController extends Controller
{
        /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $proyectoNombre = 'NINGUNO';
        $ubicacion = 'SIN UBICACIÓN';
        $actividad = null;

        $usuario = User::find($request->user()->id);
        if ($usuario->id_proyecto) {
            $proyecto = Proyecto::with('ciudad')
                ->where('id', $usuario->id_proyecto)
                ->first();

            $ubicacion = $proyecto ? $proyecto->ciudad->nombre : 'SIN UBICACIÓN';
            $actividad = Actividades::where('id_proyecto', $usuario->id_proyecto)->first();
            $proyectoNombre = $proyecto->nombre;
        }

        $data = [
            'nombre_proyecto' => $proyectoNombre,
            'ubicacion' => $ubicacion,
            'actividad' => $actividad,
        ];

        return view('pages.dashboard', $data);
    }
}
