<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
//MODELS
use App\Models\Apu;
use App\Models\ApuDetalle;
use App\Models\Actividades;
use App\Models\ActividadDetalle;

class APGController extends Controller
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

    public function index (Request $request, $id, $cantidad, $nombreTarjeta, $idActividad)
    {
        $apu = Apu::where('id', $id)
            ->with('detalles.producto')
            ->first();

        $data = [
            'apu' => $apu,
            'cantidad' => $cantidad,
            'tarjeta' => $nombreTarjeta,
            'idActividad' => $idActividad,
            'idApu' => $id
        ];
        
        return view('sistema.apg.apg-view', $data);
    }

    public function update (Request $request)
    {
        $rules = [
            'id_apu' => 'required|exists:apus,id',
            'id_actividad' => 'required',
            'nombre' => 'required|min:1|max:200',
            'productos' => 'array|required',
            'productos.*.id_producto' => 'required|exists:productos,id',
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

        ApuDetalle::where('id_apu',  $request->get('id_apu'))->delete();

        $apu = Apu::find($request->get('id_apu'));
        $apu->valor_total = $request->get('varlor_total') / $request->get('cantidad');
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
                    'total' => $producto->costo_total_apg,
                ]);
            }
        }

        // ActividadDetalle::where('id_actividad', $request->get('id_actividad'))
        //     ->where('id_apu', $request->get('id_apu'))
        //     ->update([
        //         'valor_total' => $request->get('varlor_total') / $request->get('cantidad')
        //     ]);

        return response()->json([
            'success'=>	true,
            'data' => $apu,
            'message'=> 'APU actualizado con exito!'
        ]);
    }
}