<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//MODELS
use App\Models\Empleado;
use App\Models\Prestaciones;

class EmpleadosController extends Controller
{
    public function indexEmpleados (Request $request)
    {
        return view('sistema.empleados.empleados-view');
    }

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

            $empleados = Empleado::orderBy($columnName,$columnSortOrder);

            if ($request->get('search')) {
                $empleados->where('nombre', 'LIKE', '%'.$request->get('search').'%');
            }

            $empleadosTotals = $empleados->get();

            $empleadosPaginate = $empleados->skip($start)
                ->take($rowperpage);

            return response()->json([
                'success'=>	true,
                'draw' => $draw,
                'iTotalRecords' => $empleadosTotals->count(),
                'iTotalDisplayRecords' => $empleadosTotals->count(),
                'data' => $empleadosPaginate->get(),
                'perPage' => $rowperpage,
                'message'=> 'Productos generados con exito!'
            ]);


        } catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$th->getMessage()
            ], 422);
        }
    }

    public function create (Request $request)
    {
        $empleado = Empleado::create([
            'nombre' => $request->get('nombre'),
            'tipo' => $request->get('tipo'),
            'salario' => $request->get('salario'),
        ]);

        return response()->json([
            'success'=>	true,
            'data' => $empleado,
            'message'=> 'Empleado creado con exito!'
        ]);
    }

    public function update (Request $request)
    {
        $empleado = Empleado::where('id', $request->get('id'))
            ->update([
                'nombre' => $request->get('nombre'),
                'tipo' => $request->get('tipo'),
                'salario' => $request->get('salario'),
            ]);

        return response()->json([
            'success'=>	true,
            'data' => $empleado,
            'message'=> 'Empleado actualizado con exito!'
        ]);
    }

    public function delete (Request $request)
    {
        Empleado::where('id', $request->get('id'))->delete();

        return response()->json([
            'success'=>	true,
            'message'=> 'Empleado eliminado con exito!'
        ]);
    }


}
