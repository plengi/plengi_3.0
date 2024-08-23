<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
//MODELS
use App\Models\Actividades;
use App\Models\ActividadDetalle;

class ActividadesController extends Controller
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
        return view('sistema.actividades.actividades-view');
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

            $actividades = Actividades::with('detalles.apu')
                ->orderBy($columnName,$columnSortOrder);

            if ($request->get('search')) {
                $actividades->where('nombre', 'LIKE', '%'.$request->get('search').'%');
            }

            $actividadesTotals = $actividades->get();

            $actividadesPaginate = $actividades->skip($start)
                ->take($rowperpage);

            return response()->json([
                'success'=>	true,
                'draw' => $draw,
                'iTotalRecords' => $actividadesTotals->count(),
                'iTotalDisplayRecords' => $actividadesTotals->count(),
                'data' => $actividadesPaginate->get(),
                'perPage' => $rowperpage,
                'message'=> 'Actividades generados con exito!'
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
            'indirectos' => 'array|required',
            'tarjetas' => 'array|required',
        ];

        $validator = Validator::make($request->all(), $rules, $this->messages);

		if ($validator->fails()){
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$validator->errors()
            ], 422);
        }

        $actividades = Actividades::create([
            'nombre' => $request->get('nombre'),
            'costo_directo' => $request->get('costo_directo'),
            'costo_indirecto' => $request->get('costo_indirecto'),
            'costo_total' => $request->get('costo_total'),
        ]);

        foreach ($request->get('indirectos') as $indirecto) {
            $indirecto = (object)$indirecto;
            $actividades->{'porcentaje_'.$indirecto->nombre} = $indirecto->porcentaje;
        }

        $actividades->save();

        foreach ($request->get('tarjetas') as $tarjeta) {
            $tarjeta = (object)$tarjeta;
            foreach ($tarjeta->apus as $apu) {
                $apu = (object)$apu;
                $detalles = ActividadDetalle::create([
                    'id_actividad' => $actividades->id,
                    'codigo_tarjeta' => $tarjeta->consecutivo,
                    'nombre_tarjeta' => $tarjeta->nombre,
                    'id_apu' => $apu->id_apu,
                    'cantidad' => $apu->cantidad,
                    'valor_unidad' => $apu->valor_unidad,
                    'valor_total' => $apu->valor_total,
                ]);
            }
        }

        return response()->json([
            'success'=>	true,
            'data' => '',
            'message'=> 'Actividad creada con exito!'
        ]);
    }

    public function update (Request $request)
    {
        $rules = [
            'nombre' => 'required|min:1|max:200',
            'indirectos' => 'array|required',
            'tarjetas' => 'array|required',
        ];

        $validator = Validator::make($request->all(), $rules, $this->messages);

		if ($validator->fails()){
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$validator->errors()
            ], 422);
        }

        $actividades = Actividades::find($request->get('id'));
        ActividadDetalle::where('id_actividad', $request->get('id'))->delete();

        foreach ($request->get('indirectos') as $indirecto) {
            $indirecto = (object)$indirecto;
            $actividades->{'porcentaje_'.$indirecto->nombre} = $indirecto->porcentaje;
        }

        $actividades->costo_directo = $request->get('costo_directo');
        $actividades->costo_indirecto = $request->get('costo_indirecto');
        $actividades->costo_total = $request->get('costo_total');
        $actividades->nombre = $request->get('nombre');
        $actividades->save();

        foreach ($request->get('tarjetas') as $tarjeta) {
            $tarjeta = (object)$tarjeta;
            foreach ($tarjeta->apus as $apu) {
                $apu = (object)$apu;
                $detalles = ActividadDetalle::create([
                    'id_actividad' => $actividades->id,
                    'codigo_tarjeta' => $tarjeta->consecutivo,
                    'nombre_tarjeta' => $tarjeta->nombre,
                    'id_apu' => $apu->id_apu,
                    'cantidad' => $apu->cantidad,
                    'valor_unidad' => $apu->valor_unidad,
                    'valor_total' => $apu->valor_total,
                ]);
            }
        }
        return response()->json([
            'success'=>	true,
            'data' => '',
            'message'=> 'Actividad actualizada con exito!'
        ]);
    }

    public function delete (Request $request)
    {
        Actividades::where('id', $request->get('id'))->delete();
        ActividadDetalle::where('id_actividad', $request->get('id'))->delete();

        return response()->json([
            'success'=>	true,
            'message'=> 'Actividad eliminada con exito!'
        ]);
    }

}
