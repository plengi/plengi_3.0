@extends('layouts.app', ['class' => 'g-sidenav-show bg-gray-100'])

@section('content')
    @include('layouts.navbars.auth.topnav', ['title' => 'Empresas'])

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

    <script src="assets/js/sistema/jquery-3.5.1.js"></script>
    <link href="assets/css/sistema/dataTables.bootstrap5.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="container-fluid py-4">
        <div class="row" style="z-index: 9;">
            <div class="row" style="z-index: 9;">
                <div class="col-12 col-md-6 col-sm-6">
                    <button type="button" class="btn btn-success btn-sm" id="createEmpresa">Crear empresa</button>
                </div>
                <!-- <div class="col-12 col-md-6 col-sm-6">
                    <input type="text" id="searchInputManoObras" class="form-control form-control-sm search-table" onkeydown="searchManoObras(event)" placeholder="Buscar">
                </div> -->
            </div>

            <div class="card mb-4" style="content-visibility: auto; overflow: auto;">
                <div class="card-body">

                    @include('sistema.empresa.empresa-table')

                </div>
            </div>

        </div>
    </div>

    @include('sistema.empresa.empresa-form')
    
    <script src="assets/js/sistema/jquery.dataTables.min.js"></script>
    <script src="assets/js/sistema/dataTables.bootstrap5.min.js"></script>
    <script type="text/javascript" src="assets/js/componentes/empresas.js"></script>

@endsection