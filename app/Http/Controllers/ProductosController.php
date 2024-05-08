<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
//MODELS
use App\Models\Productos;

class ProductosController extends Controller
{

    public function indexMateriales (Request $request)
    {
        return view('sistema.materiales.materiales-view');
    }

    public function indexEquipos (Request $request)
    {
        return view('sistema.equipos.equipos-view');
    }

    public function indexManoObras (Request $request)
    {
        return view('sistema.mano-obras.mano-obras-view');
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

            $productos = Productos::orderBy($columnName,$columnSortOrder);

            if ($request->get('search')) {
                $productos->where('nombre', 'LIKE', '%'.$request->get('search').'%');
            }

            $productosTotals = $productos->get();

            $productosPaginate = $productos->skip($start)
                ->take($rowperpage);

            return response()->json([
                'success'=>	true,
                'draw' => $draw,
                'iTotalRecords' => $productosTotals->count(),
                'iTotalDisplayRecords' => $productosTotals->count(),
                'data' => $productosPaginate->get(),
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
        $producto = Productos::create([
            'tipo_proveedor' => $request->get('tipo_proveedor'),
            'nombre' => $request->get('nombre'),
            'unidad_medida' => $request->get('unidad_medida'),
            'tipo_producto' => $request->get('tipo_producto'),
            'valor' => $request->get('valor'),
        ]);

        return response()->json([
            'success'=>	true,
            'data' => $producto,
            'message'=> 'Producto creado con exito!'
        ]);
    }

    public function update (Request $request)
    {
        $producto = Productos::where('id', $request->get('id'))
            ->update([
                'tipo_proveedor' => $request->get('tipo_proveedor'),
                'nombre' => $request->get('nombre'),
                'unidad_medida' => $request->get('unidad_medida'),
                'tipo_producto' => $request->get('tipo_producto'),
                'valor' => $request->get('valor'),
            ]);

        return response()->json([
            'success'=>	true,
            'data' => $producto,
            'message'=> 'Producto creado con exito!'
        ]);
    }

    public function delete (Request $request)
    {
        Productos::where('id', $request->get('id'))->delete();

        return response()->json([
            'success'=>	true,
            'message'=> 'Producto eliminado con exito!'
        ]);
    }



}
