<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
//PLANTILLA
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\ResetPassword;
use App\Http\Controllers\ChangePassword;
//SISTEMA
use App\Http\Controllers\APUController;
use App\Http\Controllers\APGController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\UbicacionController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\ProyectosController;
use App\Http\Controllers\ActividadesController;

Route::group(['middleware' => 'auth'], function () {

	//EMPRESA
	Route::controller(EmpresaController::class)->group(function () {
		Route::get('/empresas', 'index')->name('empresas');
		Route::post('/empresas-create', 'create');
		Route::get('/empresas-read', 'read');
		Route::post('/empresas-select', 'selectEmpresa');
	});
	Route::group(['middleware' => ['clientconnectionweb']], function () {
		Route::get('/dashboard', [HomeController::class, 'index'])->name('home')->middleware('auth');
		//APU
		Route::controller(APUController::class)->group(function () {
			Route::get('/apu', 'index')->name('apu');
			Route::post('/apu', 'create');
			Route::put('/apu', 'update');
			Route::get('/apu-read', 'read');
			Route::delete('/apu-delete', 'delete');
			Route::get('/apu-combo', 'combo');
		});
		//APG
		Route::controller(APGController::class)->group(function () {
			Route::get('/apg/{id}/{cantidad}/{nombreTarjeta}/{idActividad}', 'index')->name('apg');
			Route::put('/apg', 'update');
		});
		//ACTIVIDADES
		Route::controller(ActividadesController::class)->group(function () {
			Route::get('/actividades', 'index')->name('actividades');
			Route::post('/actividades-create', 'create');
			Route::get('/actividades-read', 'read');
			Route::put('/actividades-update', 'update');
			Route::delete('/actividades-delete', 'delete');
		});
		//UBICACION
		Route::controller(UbicacionController::class)->group(function () {
			Route::get('ciudades-combo', 'getCiudad');
		});
		//PROYECTOS
		Route::controller(ProyectosController::class)->group(function () {
			Route::get('proyecto', 'read');
			Route::post('proyecto', 'create');
			Route::delete('proyecto', 'delete');
			Route::post('proyecto-select', 'select');
		});
		//PRODUCTOS
		Route::controller(ProductosController::class)->group(function () {
			//MATERIALES
			Route::get('/materiales', 'indexMateriales')->name('materiales');
			Route::get('/materiales-read', 'read')->name('materiales-read');
			Route::post('/materiales-create', 'create')->name('materiales-create');
			Route::put('/materiales-update', 'update')->name('materiales-update');
			Route::delete('/materiales-delete', 'delete')->name('materiales-delete');
			//EQUIPOS
			Route::get('/equipos', 'indexEquipos')->name('equipos');
			Route::get('/equipos-read', 'read')->name('equipos-read');
			Route::post('/equipos-create', 'create')->name('equipos-create');
			Route::put('/equipos-update', 'update')->name('equipos-update');
			Route::delete('/equipos-delete', 'delete')->name('equipos-delete');
			//MANO DE OBRA
			Route::get('/mano-obras', 'indexManoObras')->name('mano-obras');
			Route::get('/mano-obras-read', 'read')->name('mano-obras-read');
			Route::post('/mano-obras-create', 'create')->name('mano-obras-create');
			Route::put('/mano-obras-update', 'update')->name('mano-obras-update');
			Route::delete('/mano-obras-delete', 'delete')->name('mano-obras-delete');
			//TRANSPORTES
			Route::get('/transportes', 'indexTransportes')->name('transportes');
			Route::get('/transportes-read', 'read')->name('transportes-read');
			Route::post('/transportes-create', 'create')->name('transportes-create');
			Route::put('/transportes-update', 'update')->name('transportes-update');
			Route::delete('/transportes-delete', 'delete')->name('transportes-delete');
			//COMBO PRODUCTOS
			Route::get('/productos-combo', 'combo');
		});
	});
});

//PLANTILLA
Route::get('/', function () {return redirect('/dashboard');})->middleware('auth');
Route::get('/register', [RegisterController::class, 'create'])->middleware('guest')->name('register');
Route::post('/register', [RegisterController::class, 'store'])->middleware('guest')->name('register.perform');
Route::get('/login', [LoginController::class, 'show'])->middleware('guest')->name('login');
Route::post('/login', [LoginController::class, 'login'])->middleware('guest')->name('login.perform');
Route::get('/reset-password', [ResetPassword::class, 'show'])->middleware('guest')->name('reset-password');
Route::post('/reset-password', [ResetPassword::class, 'send'])->middleware('guest')->name('reset.perform');
Route::get('/change-password', [ChangePassword::class, 'show'])->middleware('guest')->name('change-password');
Route::post('/change-password', [ChangePassword::class, 'update'])->middleware('guest')->name('change.perform');

Route::group(['middleware' => 'auth'], function () {
	Route::get('/virtual-reality', [PageController::class, 'vr'])->name('virtual-reality');
	Route::get('/rtl', [PageController::class, 'rtl'])->name('rtl');
	Route::get('/profile', [UserProfileController::class, 'show'])->name('profile');
	Route::post('/profile', [UserProfileController::class, 'update'])->name('profile.update');
	Route::get('/profile-static', [PageController::class, 'profile'])->name('profile-static');
	Route::get('/sign-in-static', [PageController::class, 'signin'])->name('sign-in-static');
	Route::get('/sign-up-static', [PageController::class, 'signup'])->name('sign-up-static');
	Route::get('/{page}', [PageController::class, 'index'])->name('page');
	Route::post('logout', [LoginController::class, 'logout'])->name('logout');
});
