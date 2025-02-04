<?php

namespace App\Http\Middleware;

use DB;
use Config;
use Closure;
use App\Providers\RouteServiceProvider;

class ClientConnectionWeb
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		$user = $request->user();
        if(!$user->id_empresa){
            return redirect(RouteServiceProvider::EMPRESA);
        }

		Config::set('database.connections.plengi.database', $user->empresa->token_db);
		
        return $next($request);
    }
}
