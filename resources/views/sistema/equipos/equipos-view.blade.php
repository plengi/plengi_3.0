@extends('layouts.app', ['class' => 'g-sidenav-show bg-gray-100'])

@section('content')
    @include('layouts.navbars.auth.topnav', ['title' => 'Equipos'])

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
    </style>

    <link href="assets/css/sistema/dataTables.bootstrap5.min.css" rel="stylesheet" />
    <script src="assets/js/sistema/jquery-3.5.1.js"></script>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="container-fluid py-4">
        <div class="row" style="z-index: 9;">
            <div class="row" style="z-index: 9;">
                <div class="col-12 col-md-6 col-sm-6">
                    <button type="button" class="btn btn-success btn-sm" id="createEquipo">Agregar equipos</button>
                </div>
                <div class="col-12 col-md-6 col-sm-6">
                    <input type="text" id="searchInputEquipos" class="form-control form-control-sm search-table" onkeydown="searchEquipos(event)" placeholder="Buscar">
                </div>
            </div>

            <div class="card mb-4" style="content-visibility: auto; overflow: auto;">
                <div class="card-body">

                    @include('sistema.equipos.equipos-table')

                </div>
            </div>

        </div>
    </div>

    @include('sistema.equipos.equipos-form')

    <script src="assets/js/sistema/jquery.dataTables.min.js"></script>
    <script src="assets/js/sistema/dataTables.bootstrap5.min.js"></script>
    <script type="text/javascript" src="assets/js/componentes/equipos.js"></script>

@endsection
