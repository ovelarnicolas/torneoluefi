'use strict';

var mainApp = angular.module('TorneoLuefiAdminApp', [
    // 'ngResource',
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'smart-table',
    'ui.bootstrap',
    'ui.router',
    'satellizer',
    'ngFileUpload'
]);

mainApp.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    $authProvider.loginUrl = '/api/authenticate';

    $urlRouterProvider.otherwise('/auth');

    $stateProvider
    .state('auth', {
        url: '/auth',
        templateUrl: 'adminApp/views/authView.html',
        controller: 'AuthController as auth'
    })
    .state('equipos', {
        url: '/equipos',
        templateUrl: 'adminApp/views/equipos.html',
        controller: 'EquiposCtrl as equipos',
    })
    .state('torneos', {
        url: '/torneos',
        templateUrl: 'adminApp/views/torneos.html',
        controller: 'TorneosCtrl as torneos',
    })
    .state('partidos', {
        url: '/partidos',
        templateUrl: 'adminApp/views/partidos.html',
        controller: 'PartidosCtrl as partidos',
    })
    .state('zonas', {
        url: '/zonas',
        templateUrl: 'adminApp/views/zonas.html',
        controller: 'ZonasCtrl as zonas',
    })
    .state('posiciones', {
        url: '/posiciones',
        templateUrl: 'adminApp/views/posiciones.html',
        controller: 'PosicionesCtrl as posiciones',
    })
    .state('gallery', {
        url: '/gallery',
        templateUrl: 'adminApp/views/gallery.html',
        controller: 'GalleryCtrl as gallery',
    })
    .state('jugadores', {
        url: '/jugadores',
        templateUrl: 'adminApp/views/jugadores.html',
        controller: 'JugadoresCtrl as jugadores',
    })
    .state('noticias', {
        url: '/noticias',
        templateUrl: 'adminApp/views/noticias.html',
        controller: 'NoticiasCtrl as noticias',
    });

});


mainApp.controller('AuthController', function($auth, $state) {

    var vm = this;

    vm.loginError = false;

    vm.login = function() {

        var credentials = {
            email: vm.email,
            password: vm.password
        }

        // Use Satellizer's $auth service to login
        $auth.login(credentials).then(function(data) {

            // If login is successful, redirect to the partidos state
            $state.go('partidos', {});
        }, function(error) {
            vm.loginError = true;
            console.log(error);
        });

    }

});

mainApp.controller('navController', function($scope, $auth) {
    $scope.logout = function() {
        $auth.logout();
    }
});
