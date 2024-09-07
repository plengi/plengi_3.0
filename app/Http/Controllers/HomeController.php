<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//MODELS
use App\Models\User;
use App\Models\Proyecto;

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
        $usuario = User::find($request->user()->id);
        if ($usuario->id_proyecto) {
            $proyecto = Proyecto::find($usuario->id_proyecto);
            $proyectoNombre = $proyecto->nombre;
        }

        $data = [
            'nombre_proyecto' => $proyectoNombre
        ];

        return view('pages.dashboard', $data);
    }
}
