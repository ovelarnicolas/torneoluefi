'use strict';

/**
* @ngdoc function
* @name TorneoLuefiAdminApp.controller:JugadoresCtrl
* @description
* # JugadoresCtrl
* Controller of the TorneoLuefiAdminApp
*/

angular.module('TorneoLuefiAdminApp')
.controller('JugadoresCtrl', [ '$scope', '$http', '$uibModal', '$state', '$auth', function ($scope, $http, $uibModal, $state, $auth) {

    if (!$auth.isAuthenticated()) {
        $state.go('auth');
    }

    $scope.selectedDivision = '';
    $scope.$watch('selectedDivision', function() {
        $scope.selectedZona = '';
        $scope.showGrid = false;
    });

    $http.get('api/divisiones').success(function(data) {
        $scope.divisiones = data;
    });

    $scope.selectedZona = '';
    $scope.$watch('selectedZona', function() {
        $scope.selectedTorneo = '';
        $scope.showGrid = false;
    });

    $http.get('api/zonas').success(function(data) {
        $scope.zonas = data;
    });

    $scope.selectedTorneo = '';
    $http.get('api/torneos').success(function(data) {
        $scope.torneos = data;
    });

    $scope.$watch('selectedTorneo', function() {
        $scope.showGrid = false;
    });

    $scope.selectedEquipo = '';
    $http.get('api/equipos').success(function(data) {
        $scope.equipos = data;
    });

    $scope.update = function() {
        $scope.showGrid = false;
    }

    $scope.searchJugadores = function() {
        $http.get('api/jugadores/?equipo=' + $scope.selectedEquipo + '&torneo=' + $scope.selectedTorneo).success(function(data) {
            $scope.showGrid = true;
            $scope.jugadoresCollection = data;
        });
    };

    $scope.jugadoresCollection = [];

    $scope.nuevoJugador = {};
    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'JugadorModal.html',
            controller: 'CreateJugadorModalCtrl',
            resolve: {
                modalTitle: function () { return 'Create' },
                selectedEquipo: function () { return $scope.selectedEquipo },
                selectedTorneo: function () { return $scope.selectedTorneo }
            }
        });

        modalInstance.result.then(function (nuevoJugador) {
            console.log(nuevoJugador);
            $http.post('api/jugadores', nuevoJugador).success(function(data) {
                $scope.searchJugadores();
            }).error(function(error) {
                alert('Ocurrio un error al crear el Jugador');
                console.log(error);
            });
        });
    }


    $scope.removeJugador = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true){
            $http.post('api/jugadores/delete/' + row.id).success(function(data) {
                $scope.searchJugadores();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar el Jugador');
            })
        }
    }

    $scope.updateJugador = function(row) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'JugadorModal.html',
            controller: 'UpdateJugadorModalCtrl',
            resolve: {
                jugador: function () {
                    return { id: row.id, nombre: row.nombre, apellido: row.apellido,
                        dni: row.dni, fecha_nacimiento: row.fecha_nacimiento,
                        torneo_id: row.torneo_id, equipo_id: row.equipo_id };
                    },
                    modalTitle: function () { return 'Update' },
                    selectedEquipo: function () { return $scope.selectedEquipo },
                    selectedTorneo: function () { return $scope.selectedTorneo }
                }
            });

            modalInstance.result.then(function (jugador) {
                jugador._method = 'PUT';
                $http.post('api/jugadores/' + row.id, jugador).success(function(data) {
                    console.log(data);
                    $scope.searchJugadores();
                }).error(function(error) {
                    console.log(error);
                    alert('Ocurrio un error al editar el Jugador');
                });
            });

        }

    }]);

    angular.module('TorneoLuefiAdminApp').controller('CreateJugadorModalCtrl', function ($scope, $http, $uibModalInstance, modalTitle, selectedEquipo, selectedTorneo) {

        $scope.jugador = {};
        $scope.modalTitle = modalTitle;

        $scope.ok = function() {
            $scope.jugador.equipo_id = selectedEquipo;
            $scope.jugador.torneo_id = selectedTorneo;

            $uibModalInstance.close($scope.jugador);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

    angular.module('TorneoLuefiAdminApp').controller('UpdateJugadorModalCtrl', function ($scope, $http, $uibModalInstance, jugador, modalTitle, selectedEquipo, selectedTorneo) {

        $scope.jugador = jugador;
        $scope.modalTitle = modalTitle;

        $scope.ok = function() {
            $scope.jugador.equipo_id = selectedEquipo;
            $scope.jugador.torneo_id = selectedTorneo;

            $uibModalInstance.close($scope.jugador);
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
