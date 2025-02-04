<aside class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
    id="sidenav-main">
    <div class="sidenav-header">
        <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true" id="iconSidenav"></i>
        <a class="navbar-brand m-0" href="{{ route('home') }}"
            target="_blank">
            <img src="./img/logo-ct-dark.png" class="navbar-brand-img h-100" alt="main_logo">
            <span class="ms-1 font-weight-bold">{{ Auth::user()->empresa?->razon_social }}</span>
        </a>
    </div>
    <hr class="horizontal dark mt-0">
    <div class="collapse navbar-collapse w-auto " id="sidenav-collapse-main" style="height: 100%;">
        <ul class="navbar-nav">
            @if (Auth::user()->id_empresa)
            <li class="nav-item">
                <a class="nav-link {{ Route::currentRouteName() == 'home' ? 'active' : '' }}" href="{{ route('home') }}">
                    <div
                        class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                    </div>
                    <span class="nav-link-text ms-1">Dashboard</span>
                </a>
            </li>
            @endif
            <li class="nav-item">
                    <a class="nav-link {{ Route::currentRouteName() == 'empresas' ? 'active' : '' }}" href="{{ route('empresas') }}">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Empresas</span>
                    </a>
                </li>
            @if (Auth::user()->id_proyecto && Auth::user()->has_empresa)
                <li class="nav-item">
                    <a class="nav-link {{ Route::currentRouteName() == 'actividades' ? 'active' : '' }}" href="{{ route('actividades') }}">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Actividades</span>
                    </a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link {{ Route::currentRouteName() == 'apu' ? 'active' : '' }}" href="{{ route('apu') }}">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Apu</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ Route::currentRouteName() == 'materiales' ? 'active' : '' }}" href="{{ route('materiales') }}">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Materiales</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ Route::currentRouteName() == 'equipos' ? 'active' : '' }}" href="{{ route('equipos') }}">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Equipos</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ Route::currentRouteName() == 'mano-obras' ? 'active' : '' }}" href="{{ route('mano-obras') }}">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Mano de obra</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link {{ Route::currentRouteName() == 'transportes' ? 'active' : '' }}" href="{{ route('transportes') }}">
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                        </div>
                        <span class="nav-link-text ms-1">Transporte</span>
                    </a>
                </li>
            @endif


        </ul>
    </div>
</aside>
