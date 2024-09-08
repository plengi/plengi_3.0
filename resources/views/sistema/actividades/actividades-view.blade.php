@extends('layouts.app', ['class' => 'g-sidenav-show bg-gray-100'])

@section('content')
    @include('layouts.navbars.auth.topnav', ['title' => 'Actividades'])

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
        .item-actividades {
            border: 0px;
            border-bottom: 1px solid;
            border-top: solid 1px;
            border-bottom-right-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
            border-top-right-radius: 0px !important;
            border-top-left-radius: 0px !important;
        }

        .tarjeta-desing {
            padding: 0px; border-radius: 5px; border-color: black; margin-bottom: 10px;
        }

        .item-group {
            width: 100%;
            margin-left: 0px;
            padding: 0px;
            height: 35px;
            place-content: center;
            display: -webkit-box;
        }

        .item-componente-1 {
            font-size: 13px; border-right: solid 1px; font-weight: 500; color: black;
        }

        .item-componente-2 {
            font-size: 13px; font-weight: 500; color: black;
        }

        .item-componente-3 {
            font-size: 13px; font-weight: 500; color: black; text-align: end;
        }

        .text-nombre {
            text-align: center; background-color: #059d7f; color: white; font-weight: bold; font-size: 14px; margin-bottom: 0px; border-top-left-radius: 7px; border-top-right-radius: 7px;
        }

        .text-numero {
            color: white; font-weight: bold; font-size: 14px; margin-bottom: 0px; margin-top: -23px; margin-left: 5px; margin-bottom: 10px;
        }

        .input-cantidad {
            width: 100%;
            border-radius: 5px;
            border: solid 1px #858585;
            text-align: end;
        }

        .foot-totals {
            width: 100%;
            background-color: #48ae9a69;
            margin-left: 0px;
        }

        .table-actividades thead th {
            padding: 0.2rem 1.5rem !important;
            text-transform: capitalize !important;
            letter-spacing: 0px !important;
            border-bottom: 1px solid #e9ecef !important;
        }

        .line-item {
            text-align: center; background-color: #6d6d6d; color: #484848; font-weight: bold; font-size: 18px; height: 1px; margin-top: 1px; margin-bottom: 1px;
        }

    </style>

    <script src="assets/js/sistema/jquery-3.5.1.js"></script>
    <link href="assets/css/sistema/dataTables.bootstrap5.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="container-fluid py-4">
        <div class="row" style="z-index: 9;">

            <!-- <div id="actions-actividades-component" class="row" style="z-index: 9;">
                <div class="col-12 col-md-6 col-sm-6">
                    <button type="button" class="btn btn-success btn-sm" id="createActividades">Agregar Actividad</button>
                </div>
                <div class="col-12 col-md-6 col-sm-6">
                    <input type="text" id="searchInputActividades" class="form-control form-control-sm search-table" onkeydown="searchActividades(event)" placeholder="Buscar">
                </div>
            </div> -->

            <div id="actions-actividades-create" class="row" style="z-index: 9; display: block;">
                <div class="col-12 col-md-6 col-sm-6">
                    <button type="button" class="btn btn-success btn-sm" id="crearActividades">
                        Crear Actividad
                    </button>
                    <button type="button" class="btn btn-success btn-sm" id="actualizarActividades" style="display: none;">
                        Actualizar Actividad
                    </button>
                    <button id="crearActividadesLoading" class="btn btn-success btn-sm ms-auto" style="display:none;" disabled>
                        Cargando
                        <i class="fa fa-spinner fa-pulse"></i>
                    </button>
                </div>
            </div>


            <!-- <div id="table-actividades-component" class="card mb-4" style="content-visibility: auto; overflow: auto;">
                <div class="card-body">

                    @include('sistema.actividades.actividades-table')

                </div>
            </div> -->

            @include('sistema.actividades.actividades-create')

        </div>
    </div>
    <script>
        var actividad_general = JSON.parse('<?php echo $actividad; ?>');
    </script>
    <script src="assets/js/sistema/jquery.dataTables.min.js"></script>
    <script src="assets/js/sistema/dataTables.bootstrap5.min.js"></script>
    <script type="text/javascript" src="assets/js/componentes/actividades.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
    <script src="https://sortablejs.github.io/Sortable/Sortable.js"></script>
    
@endsection