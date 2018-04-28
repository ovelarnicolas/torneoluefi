<!DOCTYPE html>
<html lang="en" ng-app="torneoLuefiWebApp">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.js"></script>

    <title>@yield('title')</title>

    <!-- Bootstrap Core CSS -->
    <!-- <link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet"> -->
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="{{ asset('css/clean-blog.css') }}" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="{{ asset('css/slider.css') }}" rel="stylesheet">

    <link href="{{ asset('css/jquery.fancybox.css') }}" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- FavIcon -->
    <link href="Images/favicon.ico" type="image/x-icon" rel="shortcut icon" />
</head>

<body ng-cloak>

    <!-- Google Analytic -->
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-63149879-1', 'auto');
    ga('send', 'pageview');
    </script>

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">
                    L.U.E.F.I 2017
                </a>
            </div>

            <!-- NavBar -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="/">Inicio</a>
                    </li>
                    <li>
                        <a href="/nosotros">Nosotros</a>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="menu" aria-haspopup="true" aria-expanded="true">Posiciones<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            @foreach($divisiones as $division)
                            <li><a href="/divisiones/{{ $division->id }}">{{ $division->nombre }}</a></li>
                            @endforeach
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Fixture<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            @foreach($divisiones as $division)
                            <li><a href="/partidos/{{ $division->id }}">{{ $division->nombre }}</a></li>
                            @endforeach
                        </ul>
                    </li>
                    <li>
                        <a href="/galeria">Galería</a>
                    </li>
                    <li>
                        <a href="/campeones">Campeones</a>
                    </li>
                    <li>
                        <a href="/reglamento">Reglamento</a>
                    </li>
                    <li>
                        <a href="/informacion">Información</a>
                    </li>
                    <li>
                        <a href="/contacto">Contacto</a>
                    </li>
                </div>
                <!-- /.navbar-collapse -->
            </div>
        </nav>

        <!-- Page Header -->
        <header class="intro-header" style="background-image:url('{{ asset('img/Utils/header.jpg') }}')">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <div class="site-heading">
                            @yield('siteheading')
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div id="content" class="container">
            <div class="row">

                @yield('content')

            </div>

        </div>


        <!-- Footer -->
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <ul class="list-inline text-center">
                            <li>
                                <a href="https://twitter.com/torneoluefi">
                                    <span class="fa-stack fa-lg">
                                        <i class="fa fa-circle fa-stack-2x"></i>
                                        <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/torneoluefi">
                                    <span class="fa-stack fa-lg">
                                        <i class="fa fa-circle fa-stack-2x"></i>
                                        <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div align="center">
                    <img src="{{ asset('img/Utils/bom_logo.png') }}" alt="">
                    <p class="copyright text-muted">Copyright &copy; BOM Solutions 2017 <br />
                        <a href="#">ovelar.nico@gmail.com</a>
                        <br><a href="#">sergiobaglieri@gmail.com</a>
                    </p>
                </div>
            </div>
        </footer>

        <!-- jQuery -->
        <script src="{{ asset('js/jquery.min.js') }}"></script>

        <!-- Bootstrap Core JavaScript -->
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>

        <!-- Custom Theme JavaScript -->
        <script src="{{ asset('js/clean-blog.min.js') }}"></script>

        <!-- Custom Theme JavaScript -->
        <script src="{{ asset('js/slider.js') }}"></script>

        <script src="{{ asset('js/jquery.slides.min.js') }}"></script>

        <script src="{{ asset('js/jquery.fancybox.js') }}"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.8/angular-filter.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.js"></script>
        <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.3.1.js"></script>

        @yield('footer')

        <script src="{{ asset('js/webapp.js') }}"></script>
    </body>

    </html>
