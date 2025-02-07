<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//MODELS
use App\Models\Apu;
use App\Models\User;
use App\Models\Proyecto;
use App\Models\Productos;
use App\Models\ApuDetalle;
use App\Models\Actividades;
use App\Models\ActividadDetalle;

class ProyectosController extends Controller
{

    public function read (Request $request)
    {
        try {
            $draw = $request->get('draw');
            $start = $request->get("start");
            $rowperpage = $request->get("length");

            $columnIndex_arr = $request->get('order');
            $columnName_arr = $request->get('columns');
            $order_arr = $request->get('order');

            $columnIndex = $columnIndex_arr[0]['column']; // Column index
            $columnName = $columnName_arr[$columnIndex]['data']; // Column name
            $columnSortOrder = $order_arr[0]['dir']; // asc or desc

            $proyectos = Proyecto::orderBy($columnName,$columnSortOrder)
                ->with('ciudad', 'actividad');

            if ($request->get('search')) {
                $proyectos->where('nombre', 'LIKE', '%'.$request->get('search').'%');
            }

            $proyectosTotals = $proyectos->get();

            $proyectosPaginate = $proyectos->skip($start)
                ->take($rowperpage);

            return response()->json([
                'success'=>	true,
                'draw' => $draw,
                'iTotalRecords' => $proyectosTotals->count(),
                'iTotalDisplayRecords' => $proyectosTotals->count(),
                'data' => $proyectosPaginate->get(),
                'perPage' => $rowperpage,
                'message'=> 'Proyectos generados con exito!'
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$th->getMessage()
            ], 422);
        }
    }

    public function create(Request $request)
    {
        $proyecto = Proyecto::create([
            'nombre' => $request->get('nombre'),
            'tipo_obra' => $request->get('tipo_obra'),
            'id_ciudad' => $request->get('id_ciudad'),
            'fecha' => $request->get('fecha'),
        ]);

        return response()->json([
            'success'=>	true,
            'data' => $proyecto,
            'message'=> 'Proyecto creado con exito!'
        ]);
    }

    public function select(Request $request)
    {
        $usuario = User::where('id', $request->user()->id)
            ->update([
                'id_proyecto' => $request->get('id')
            ]);

        return response()->json([
            'success'=>	true,
            'data' => '',
            'message'=> 'Proyecto seleccionado con exito!'
        ]);
    }

    public function delete (Request $request)
    {
        $actividades = Actividades::where('id_proyecto', $request->get('id'))
            ->get();

        foreach ($actividades as $key => $actividad) {
            ActividadDetalle::where('id_actividad', $actividad->id)->delete();
        }

        $apus = Apu::where('id_proyecto', $request->get('id'))
            ->get();

        foreach ($apus as $key => $apu) {
            ApuDetalle::where('id_apu', $apu->id)->delete();
        }

        Proyecto::where('id', $request->get('id'))->delete();
        Apu::where('id_proyecto', $request->get('id'))->delete();
        Productos::where('id_proyecto', $request->get('id'))->delete();

        return response()->json([
            'success'=>	true,
            'message'=> 'Proyecto eliminado con exito!'
        ]);
    }

    public function combo (Request $request)
    {
        $proyectos = Proyecto::select(
            \DB::raw('*'),
            \DB::raw("nombre as text")
        );

        if ($request->get("q")) {
            $proyectos->where('nombre', 'LIKE', '%' . $request->get("q") . '%');
        }

        return $proyectos->orderBy('nombre', 'ASC')->paginate(40);
    }

}
