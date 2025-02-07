<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
//MODELS
use App\Models\Apu;
use App\Models\ApuDetalle;

class APUController extends Controller
{

    public function __construct()
	{
		$this->messages = [
            'required' => 'El campo :attribute es requerido.',
            'exists' => 'El :attribute es inválido.',
            'numeric' => 'El campo :attribute debe ser un valor numérico.',
            'string' => 'El campo :attribute debe ser texto',
            'array' => 'El campo :attribute debe ser un arreglo.',
            'date' => 'El campo :attribute debe ser una fecha válida.',
        ];
	}

    public function index (Request $request)
    {
        return view('sistema.apu.apu-view');
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

            $productos = Apu::orderBy($columnName,$columnSortOrder)
                ->where('id_proyecto', $request->user()->id_proyecto)
                ->with('detalles.producto');

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
        $rules = [
            'nombre' => 'required|min:1|max:200',
            'unidad_medida' => 'required',
            'productos' => 'array|required',
            'productos.*.id_producto' => 'required|exists:plengi.productos,id',
            'productos.*.costo' => 'required|min:0',
            'productos.*.costo_total' => 'required|min:0',
            'productos.*.porcentaje_desperdicio' => 'required|min:0',
            'productos.*.porcentaje_rendimiento' => 'required|min:0',
            'productos.*.distancia' => 'required|min:0',
            'productos.*.unidad_medida' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules, $this->messages);

		if ($validator->fails()){
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$validator->errors()
            ], 422);
        }

        $apu = Apu::create([
            'id_proyecto' => $request->user()->id_proyecto,
            'nombre' => $request->get('nombre'),
            'unidad_medida' => $request->get('unidad_medida'),
            'valor_total' => $request->get('varlor_total'),
        ]);

        $totalAPU = 0;
        $productos = $request->get('productos');

        if ($productos) {
            foreach ($productos as $producto) {
                $producto = (object)$producto;
                // dd( $producto);
                ApuDetalle::create([
                    'id_apu' => $apu->id,
                    'id_producto' => $producto->id_producto,
                    'cantidad' => $producto->cantidad,
                    'cantidad_total' => $producto->cantidad_total,
                    'costo' => $producto->costo,
                    'prestaciones' => $producto->prestaciones,
                    'desperdicio' => $producto->porcentaje_desperdicio,
                    'rendimiento' => $producto->porcentaje_rendimiento,
                    'distancia' => $producto->distancia,
                    'total' => $producto->costo_total,
                ]);
            }
        }

        return response()->json([
            'success'=>	true,
            'data' => $apu,
            'message'=> 'APU creado con exito!'
        ]);
    }

    public function update (Request $request)
    {
        $rules = [
            'id' => 'required|exists:apus,id',
            'nombre' => 'required|min:1|max:200',
            'unidad_medida' => 'required',
            'productos' => 'array|required',
            'productos.*.id_producto' => 'required|exists:plengi.productos,id',
            'productos.*.costo' => 'required|min:0',
            'productos.*.costo_total' => 'required|min:0',
            'productos.*.porcentaje_desperdicio' => 'required|min:0',
            'productos.*.porcentaje_rendimiento' => 'required|min:0',
            'productos.*.distancia' => 'required|min:0',
            'productos.*.unidad_medida' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules, $this->messages);

		if ($validator->fails()){
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$validator->errors()
            ], 422);
        }

        ApuDetalle::where('id_apu',  $request->get('id'))->delete();

        $apu = Apu::find($request->get('id'));
        $apu->nombre = $request->get('nombre');
        $apu->unidad_medida = $request->get('unidad_medida');
        $apu->valor_total = $request->get('varlor_total');
        $apu->save();

        $productos = $request->get('productos');
        if ($productos) {
            foreach ($productos as $producto) {
                $producto = (object)$producto;
                ApuDetalle::create([
                    'id_apu' => $apu->id,
                    'id_producto' => $producto->id_producto,
                    'cantidad' => $producto->cantidad,
                    'cantidad_total' => $producto->cantidad_total,
                    'costo' => $producto->costo,
                    'prestaciones' => $producto->prestaciones,
                    'desperdicio' => $producto->porcentaje_desperdicio,
                    'rendimiento' => $producto->porcentaje_rendimiento,
                    'distancia' => $producto->distancia,
                    'total' => $producto->costo_total,
                ]);
            }
        }

        return response()->json([
            'success'=>	true,
            'data' => $apu,
            'message'=> 'APU actualizado con exito!'
        ]);
    }

    public function delete (Request $request)
    {
        Apu::where('id', $request->get('id'))->delete();
        ApuDetalle::where('id_apu', $request->get('id'))->delete();

        return response()->json([
            'success'=>	true,
            'message'=> 'Apu eliminado con exito!'
        ]);
    }

    public function combo (Request $request)
    {
        $apu = Apu::select(
            \DB::raw('*'),
            \DB::raw("nombre as text")
        );

        if ($request->get("search")) {
            $apu->where('nombre', 'LIKE', '%' . $request->get("search") . '%');
        }

        return $apu->paginate(40);
    }

}
