<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Admin Panel - LUEFI</title>

    <base href="/admin" />

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- FavIcon -->
    <link href="Images/favicon.ico" type="image/x-icon" rel="shortcut icon" />
</head>

<body ng-app="TorneoLuefiAdminApp">

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">
                    Admin Panel LUEFI
                </a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" ng-controller="navController">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="#/partidos">Partidos</a>
                    </li>
                    <li>
                        <a href="#/posiciones">Posiciones</a>
                    </li>
                    <li>
                        <a href="#/equipos">Equipos</a>
                    </li>
                    <li>
                        <a href="#/torneos">Categorías</a>
                    </li>
                    <li>
                        <a href="#/zonas">Zonas</a>
                    </li>
                    <li>
                        <a href="#/gallery">Galerias</a>
                    </li>
                    <li>
                        <a href="#/noticias">Noticias</a>
                    </li>
                    <li>
                        <a href="#/jugadores">Planillas</a>
                    </li>
                    <li>
                        <a href="#" ng-click="logout()">Salir</a>
                    </li>
                </div>
            </div>
        </div>
        <!-- /.container -->
    </nav>

    <div class="container" style="margin-top:60px;">
        <div ui-view></div>
    </div>

    <footer></footer>

    <!-- jQuery -->
    <script src="js/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="js/clean-blog.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-animate.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-touch.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.2.5/ui-bootstrap-tpls.min.js"></script>
    <script src="adminApp/scripts/angular-ui-router.min.js"></script>
    <script src="adminApp/scripts/satellizer.min.js"></script>
    <script src="adminApp/scripts/smart-table.min.js"></script>
    <script src="adminApp/scripts/ng-file-upload.min.js"></script>

    <script src="adminApp/app.js"></script>
    <script src="adminApp/controllers/equipos.js"></script>
    <script src="adminApp/controllers/partidos.js"></script>
    <script src="adminApp/controllers/torneos.js"></script>
    <script src="adminApp/controllers/zonas.js"></script>
    <script src="adminApp/controllers/posiciones.js"></script>
    <script src="adminApp/controllers/gallery.js"></script>
    <script src="adminApp/controllers/noticias.js"></script>
    <script src="adminApp/controllers/jugadores.js"></script>

</body>

</html>
