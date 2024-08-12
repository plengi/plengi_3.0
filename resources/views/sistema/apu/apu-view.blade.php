@extends('layouts.app', ['class' => 'g-sidenav-show bg-gray-100'])

@section('content')
    @include('layouts.navbars.auth.topnav', ['title' => 'Apu'])

    <style>
        tbody {
            font-size: 14px;
        }
        thead {
            font-size: 14px;
        }
        .invalid-feedback {
            font-size: 11px;
        }
        .dataTables_info {
            font-size: 13px;
        }
        .pagination {
            margin-top: -20px !important;
        }
        .select2-container--bootstrap-5 .select2-dropdown .select2-results__options .select2-results__option {
            font-size: 13px !important;
        }

        select+.select2-container--bootstrap-5 {
            width: 100% !important;
        }
        .select2-container .select2-selection--single .select2-selection__rendered {
            margin-top: -5px;
        }

        .select2-container--bootstrap-5 .select2-selection {
            min-height: calc(1.0em + .75rem + 2px) !important;
        }
        .select2-container--bootstrap-5 .select2-selection--single .select2-selection__rendered .select2-selection__placeholder {
            font-size: 13px;
        }
    </style>

    <script src="assets/js/sistema/jquery-3.5.1.js"></script>
    <link href="assets/css/sistema/dataTables.bootstrap5.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="container-fluid py-4">
        <div class="row" style="z-index: 9;">

            <div id="actions-apu-component" class="row" style="z-index: 9;">
                <div class="col-12 col-md-6 col-sm-6">
                    <button type="button" class="btn btn-success btn-sm" id="createApu">Agregar APU</button>
                </div>
                <div class="col-12 col-md-6 col-sm-6">
                    <input type="text" id="searchInputApu" class="form-control form-control-sm search-table" onkeydown="searchApu(event)" placeholder="Buscar">
                </div>
            </div>

            <div id="actions-apu-create" class="row" style="z-index: 9; display: none;">
                <div class="col-12 col-md-6 col-sm-6">
                    <button type="button" class="btn btn-danger btn-sm" id="volverApu">
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-success btn-sm" id="crearApu">
                        Crear APU
                    </button>
                    <button type="button" class="btn btn-success btn-sm" id="actualizarApu" style="display: none;">
                        Actualizar APU
                    </button>
                    <button id="crearApuLoading" class="btn btn-success btn-sm ms-auto" style="display:none;" disabled>
                        Creando
                        <i class="fas fa-spinner fa-spin"></i>
                    </button>
                </div>
            </div>


            <div id="table-apu-component" class="card mb-4" style="content-visibility: auto; overflow: auto;">
                <div class="card-body">

                    @include('sistema.apu.apu-table')

                </div>
            </div>

            @include('sistema.apu.apu-create')

        </div>
    </div>
    
    <script src="assets/js/sistema/jquery.dataTables.min.js"></script>
    <script src="assets/js/sistema/dataTables.bootstrap5.min.js"></script>
    <script type="text/javascript" src="assets/js/componentes/apu.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->
    
@endsection