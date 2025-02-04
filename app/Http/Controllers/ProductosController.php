<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
//MODELS
use App\Models\Productos;
use App\Models\ApuDetalle;

class ProductosController extends Controller
{

    public function indexMateriales (Request $request)
    {
        $data = [
            'cantidad_productos' => $this->totalProductos()
        ];
        return view('sistema.materiales.materiales-view', $data);
    }

    public function indexEquipos (Request $request)
    {
        $data = [
            'cantidad_productos' => $this->totalProductos()
        ];
        return view('sistema.equipos.equipos-view', $data);
    }

    public function indexManoObras (Request $request)
    {
        return view('sistema.mano-obras.mano-obras-view');
    }

    public function indexTransportes (Request $request)
    {
        $data = [
            'cantidad_productos' => $this->totalProductos()
        ];
        return view('sistema.transportes.transportes-view', $data);
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

            $productos = Productos::orderBy($columnName,$columnSortOrder)
                ->where('id_proyecto', $request->user()->id_proyecto);

            if ($request->get('search')) {
                $productos->where('nombre', 'LIKE', '%'.$request->get('search').'%');
            }

            if ($request->get("tipo_producto") == "0" || $request->get("tipo_producto")) {
                $productos->where('tipo_producto', $request->get("tipo_producto"));
            }

            $productosTotals = $productos->get();

            $productosPaginate = $productos->skip($start)
                ->take($rowperpage)
                ->get();

            $dataProductos = [];

            foreach ($productosPaginate as $key => $producto) {
                $totalProducto = DB::connection('plengi')->table('actividad_detalles AS ACD')
                    ->leftJoin('apu_detalles AS APD', 'ACD.id_apu', '=', 'APD.id_apu')
                    ->leftJoin('productos AS PR', 'APD.id_producto', '=', 'PR.id')
                    ->select(
                        DB::raw('MAX(ACD.id_apu) AS id_apu'), // Usando MAX para obtener un valor representativo
                        'APD.id_producto',
                        DB::raw('MAX(PR.valor) AS valor_producto'), // Usando MAX para el valor del producto
                        DB::raw('SUM(CAST(APD.cantidad * ACD.cantidad AS DECIMAL(10, 2))) AS cantidad_productos'),
                        DB::raw('SUM(CAST((APD.cantidad * ACD.cantidad) * PR.valor AS DECIMAL(10, 2))) AS total_productos')
                    )
                    ->where('APD.id_producto', $producto->id)
                    ->groupBy('APD.id_producto')
                    ->first();

                $data = [
                    "id" => $producto->id,
                    "id_proyecto" => $producto->id_proyecto,
                    "tipo_proveedor" => $producto->tipo_proveedor,
                    "nombre" => $producto->nombre,
                    "unidad_medida" => $producto->unidad_medida,
                    "tipo_producto" => $producto->tipo_producto,
                    "valor" => $producto->valor,
                    "cantidad_productos" => $totalProducto ? $totalProducto->cantidad_productos : 0,
                    "total_productos" => $totalProducto ? $totalProducto->total_productos : 0,
                    "created_at" => $producto->created_at,
                    "updated_at" => $producto->updated_at
                ];

                $dataProductos[] = $data;
            }

            return response()->json([
                'success'=>	true,
                'draw' => $draw,
                'iTotalRecords' => $productosTotals->count(),
                'iTotalDisplayRecords' => $productosTotals->count(),
                'data' => $dataProductos,
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
            'id_proyecto' => $request->user()->id_proyecto,
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

    public function combo (Request $request)
    {
        $productos = Productos::select(
            \DB::raw('*'),
            \DB::raw("CONCAT(nombre, ' - ', unidad_medida, ' - ', valor) as text")
        );

        if ($request->get("search")) {
            $productos->where('nombre', 'LIKE', '%' . $request->get("search") . '%');
        }

        if ($request->get("tipo_producto") == "0" || $request->get("tipo_producto")) {
            $productos->where('tipo_producto', $request->get("tipo_producto"));
        }

        return $productos->paginate(40);
    }

    private function totalProductos ()
    {
        $totalProducto = DB::connection('plengi')->table('actividad_detalles AS ACD')
            ->leftJoin('apu_detalles AS APD', 'ACD.id_apu', '=', 'APD.id_apu')
            ->leftJoin('productos AS PR', 'APD.id_producto', '=', 'PR.id')
            ->select(
                DB::raw('SUM(CAST(APD.cantidad * ACD.cantidad AS DECIMAL(10, 2))) AS cantidad_productos')
            )
            ->where('PR.tipo_producto', '!=', 2)
            ->first();

        return $totalProducto ? $totalProducto->cantidad_productos : 0;
    }

}
