'use strict';

var webApp = angular.module('torneoLuefiWebApp', ['angular.filter', 'ngAnimate', 'ui.bootstrap']);

webApp.controller('PositionController', function($scope, $http) {

    $scope.divisiones = JSON.parse(_divisiones);
    $scope.selectedDivision = _selectedDivision;

    $scope.divisiones.some(function(d) {
        if (d.id == $scope.selectedDivision) {
            $scope.selectedDivision2 = d;
            return true;
        }
    });


    $scope.$watch('selectedCategoria', function(category) {

        if (!category) return;

        $http.get('/api/posiciones/ByCategory/' + category.torneo_id).success(function(data) {
            $scope.posiciones = data;
        }).error(function(error) {
            console.log(error);
            alert('Ocurrio un error al traer las posiciones.');
        });
    });

});

webApp.controller('PartidosController', function($scope, $http) {

    $scope.divisiones = JSON.parse(_divisiones);
    $scope.selectedDivision = _selectedDivision;

    $scope.divisiones.some(function(d) {
        if (d.id == $scope.selectedDivision) {
            $scope.selectedDivision2 = d;
            return true;
        }
    });


    $scope.$watch('selectedCategoria', function(category) {

        if (!category) return;

        $http.get('/api/partidos/ByCategory/' + category.torneo_id).success(function(data) {
            console.log(data);
            $scope.partidos = data;
        }).error(function(error) {
            console.log(error);
            alert('Ocurrio un error al traer los partidos.');
        })
    });

});

webApp.controller('NoticiasController', function($scope, $http) {

    $scope.sliderPhotos = [];

    var currIndex = 0;

    $http.get('/api/gallery/1').success(function(data) {

        data.forEach(function(d) {
            d.sliderPosition = currIndex++;
        });

        $scope.sliderPhotos = data;

        console.log(data);

    }).error(function(error) {
        console.log(error);
        alert('Ocurrio un error al traer las imagenes del slider.');
    });

});
