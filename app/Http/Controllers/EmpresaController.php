<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Jobs\ProcessProvisionedDatabase;
use Illuminate\Support\Facades\Validator;
//MODELS
use App\Models\User;
use App\Models\Clientes\Empresa;
use App\Models\Clientes\UsuarioEmpresa;

class EmpresaController extends Controller
{
    protected $messages = null;

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

            $usuarioEmpresa = UsuarioEmpresa::where('id_usuario', request()->user()->id)
                ->get();

            $empresas = Empresa::orderBy($columnName,$columnSortOrder);

            $idEmpresas = [];

            foreach ($usuarioEmpresa as $key => $empresa) {
                array_push($idEmpresas, $empresa->id_empresa);
            }

            $empresas->whereIn('id', $idEmpresas);

            $empresaTotals = $empresas->get();

            $empresaPaginate = $empresas->skip($start)
                ->take($rowperpage);

            return response()->json([
                'success'=>	true,
                'draw' => $draw,
                'iTotalRecords' => $empresaTotals->count(),
                'iTotalDisplayRecords' => $empresaTotals->count(),
                'data' => $empresaPaginate->get(),
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

    public function index (Request $request)
    {
        return view('sistema.empresa.empresa-view');
    }

    public function create(Request $request)
    {
        $rules = [
            'razon_social' => 'required',
            'nit' => 'required',
            'email' => 'required',
            'dv' => 'nullable',
            'telefono' => 'nullable',
            'direccion' => 'nullable',
        ];

        $validator = Validator::make($request->all(), $rules, $this->messages);

        if ($validator->fails()){
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$validator->errors()
            ], 422);
        }

        try {

            DB::connection('plengi')->beginTransaction();

            $existEmpresa = Empresa::where('nit',$request->get('nit'))->first();

            if ($existEmpresa) {
                return response()->json([
                    "success"=>false,
                    "errors"=>["La empresa ".$existEmpresa->nombre." con nit ".$existEmpresa->nit." ya está registrada."]
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $empresa = Empresa::create([
				'razon_social' => $request->razon_social,
				'nit' => $request->nit,
				'direccion' => $request->direccion,
				'email' => $request->email,
				'dv' => $request->dv,
				'telefono' => $request->telefono
			]);

            $empresa->token_db = $this->generateUniqueNameDb($empresa);
            $empresa->hash = Hash::make($empresa->id);
            $empresa->save();

            $this->associateUserToCompany($empresa);

            ProcessProvisionedDatabase::dispatch($empresa);

            DB::connection('plengi')->commit();

            return response()->json([
                "success" => true,
                'data' => '',
                "message" => 'La instalación de la empresa ha finalizado.'
            ], 200);

        } catch (Exception $e) {
            
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$e->getMessage()
            ], 422);
        }
    }

    public function selectEmpresa (Request $request)
    {
        $rules = [
            'id_empresa' => 'required|exists:clientes.empresas,id',
        ];

        $validator = Validator::make($request->all(), $rules, $this->messages);

		if ($validator->fails()){
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$validator->errors()
            ], 422);
        }

        try {

            DB::connection('clientes')->beginTransaction();

            $user =  User::find($request->user()['id']);
            
            $empresaSelect = Empresa::where('id', $request->get('id_empresa'))->first();

            $user->id_empresa = $empresaSelect->id;
            $user->id_proyecto = null;
            $user->has_empresa = $empresaSelect->token_db;
            $user->save();

            DB::connection('clientes')->commit();

            return response()->json([
                'success'=>	true,
                'empresa' => $empresaSelect,
                'message'=> 'Usuario logeado con exito!'
            ], 200);

        } catch (Exception $e) {
            DB::connection('clientes')->rollback();
            return response()->json([
                "success"=>false,
                'data' => [],
                "message"=>$e->getMessage()
            ], 422);
        }

    }

    private function generateUniqueNameDb($empresa)
	{
		$razonSocial = str_replace(" ", "_", strtolower($empresa->razon_social));
		return 'plengi_'.$razonSocial.'_'.$empresa->nit;
	}

    private function associateUserToCompany($empresa)
	{
        User::where('id', request()->user()->id)->update([
            'id_empresa' => $empresa->id,
            'has_empresa' => $empresa->token_db,
        ]);

		$usuarioEmpresa = UsuarioEmpresa::where('id_usuario', request()->user()->id)
			->where('id_empresa', $empresa->id)
			->first();

		if(!$usuarioEmpresa){
			UsuarioEmpresa::create([
				'id_usuario' => request()->user()->id,
				'id_empresa' => $empresa->id,
				'id_rol' => 2, // default: 2
				'estado' => 1, // default: 1 activo
			]);
		}

		return;
	}
}
