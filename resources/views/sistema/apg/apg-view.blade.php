@extends('layouts.app', ['class' => 'g-sidenav-show bg-gray-100'])

@section('content')
    @include('layouts.navbars.auth.topnav', ['title' => 'Apg'])

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

    <script src="{{ url('assets/js/sistema/jquery-3.5.1.js') }} "></script>
    <link href="{{ url('assets/css/sistema/dataTables.bootstrap5.min.css') }}" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <div class="container-fluid py-4">
        <div class="row" style="z-index: 9;">

            <div id="actions-apg-component" class="row" style="z-index: 9;">
                <div class="col-12 col-md-6 col-sm-6">
                    <button type="button" class="btn btn-success btn-sm" id="ActualizarApu">Actualizar APU</button>

                    <button id="crearApgLoading" class="btn btn-success btn-sm ms-auto" style="display:none;" disabled>
                        Creando
                        <i class="fa fa-spinner fa-pulse"></i>
                    </button>
                </div>
            </div>

            @include('sistema.apg.apg-create', ["tarjeta" => $tarjeta])

        </div>
    </div>
    
    <script src="{{ url('assets/js/sistema/jquery.dataTables.min.js') }}"></script>
    <script src="{{ url('assets/js/sistema/dataTables.bootstrap5.min.js') }}"></script>

    <script>
        var apu = JSON.parse('<?php echo $apu; ?>');
        var cantidadGeneral = JSON.parse('<?php echo $cantidad; ?>');
        var idActividad = JSON.parse('<?php echo $idActividad; ?>');
        var idApu = JSON.parse('<?php echo $idApu; ?>');
    </script>

    <script type="text/javascript" src="{{ url('assets/js/componentes/apg.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js" defer></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->
    
@endsection