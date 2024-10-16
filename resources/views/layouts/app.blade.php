<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="/img/apple-icon.png">
    <link rel="icon" type="image/png" href="/img/favicon.png">
    <title>
        Argon Dashboard 2 by Creative Tim
    </title>
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link href="{{ secure_asset('assets/css/nucleo-icons.css') }}" rel="stylesheet" />
    <link href="{{ secure_asset('assets/css/nucleo-svg.css') }}" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <link href="{{ secure_asset('assets/css/nucleo-svg.css') }}" rel="stylesheet" />
    <!-- CSS Files -->
    <link id="pagestyle" href="{{ secure_asset('assets/css/argon-dashboard.css') }}" rel="stylesheet" />
    <!-- DATATABLE -->
    <link href="{{ secure_asset('assets/css/sistema/dataTables.bootstrap5.min.css') }}" rel="stylesheet" />
    <link href="{{ secure_asset('assets/css/sistema/responsive.bootstrap5.min.css') }}" rel="stylesheet" />
    <!-- SELECT 2 -->
    <link href="{{ secure_asset('assets/css/sistema/select2.min.css') }}" rel="stylesheet" />
    <link href="{{ secure_asset('assets/css/sistema/select2-bootstrap-5-theme.min.css') }}" rel="stylesheet" />
</head>

<body class="{{ $class ?? '' }}">

    @guest
        @yield('content')
    @endguest

    @auth
        @if (in_array(request()->route()->getName(), ['sign-in-static', 'sign-up-static', 'login', 'register', 'recover-password', 'rtl', 'virtual-reality']))
            @yield('content')
        @else
            @if (!in_array(request()->route()->getName(), ['profile', 'profile-static']))
                <div style="z-index: -1;" class="min-height-300 bg-primary position-absolute w-100"></div>
            @elseif (in_array(request()->route()->getName(), ['profile-static', 'profile']))
                <div class="position-absolute w-100 min-height-300 top-0" style="background-image: secure_asset('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg'); background-position-y: 50%;">
                    <span class="mask bg-primary opacity-6"></span>
                </div>
            @endif
            @include('layouts.navbars.auth.sidenav')
                <main class="main-content border-radius-lg">
                    @yield('content')
                </main>
            @include('components.fixed-plugin')
        @endif
    @endauth
    
    <!--   Core JS Files   -->
    <script src="{{ secure_asset('assets/js/core/popper.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/core/bootstrap.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/plugins/perfect-scrollbar.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/plugins/smooth-scrollbar.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/sistema/jquery-3.5.1.js') }}"></script>
    <script>
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
    </script>
    <!-- Github buttons -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="{{ secure_asset('assets/js/argon-dashboard.js') }}"></script>
    <!-- DATATABLE -->
    <script src="{{ secure_asset('assets/js/sistema/jquery.dataTables.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/sistema/dataTables.bootstrap5.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/sistema/dataTables.responsive.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/sistema/responsive.bootstrap5.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/sistema/dataTables.fixedHeader.min.js') }}"></script>
    <script src="{{ secure_asset('assets/js/sistema/dataTables.fixedColumns.min.js') }}"></script>
    <!-- SELECT 2  -->
    <script src="{{ secure_asset('assets/js/sistema/select2.full.min.js') }}"></script>
    <!-- VALIDATE -->
    <script src="{{ secure_asset('assets/js/sistema/jquery.validate.min.js') }}"></script>
    <!-- sweetalert2 -->
    <script src="{{ secure_asset('assets/js/sistema/sweetalert2.all.min.js') }}"></script>

    <script src="{{ secure_asset('assets/js/sistema.js') }}"></script>
</body>


</html>
