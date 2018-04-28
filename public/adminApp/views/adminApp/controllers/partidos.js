'use strict';

/**
* @ngdoc function
* @name TorneoLuefiAdminApp.controller:PartidosCtrl
* @description
* # PartidosCtrl
* Controller of the TorneoLuefiAdminApp
*/

angular.module('TorneoLuefiAdminApp')
.controller('PartidosCtrl', [ '$scope', '$http', '$uibModal', '$state', '$auth', function ($scope, $http, $uibModal, $state, $auth) {

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

    $scope.searchPartidos = function() {
        $http.get('api/partidos/?torneo=' + $scope.selectedTorneo).success(function(data) {
            $scope.partidosCollection = data;
            $scope.showGrid = true;
        });
    };

    $scope.partidosCollection = [];


    $scope.nuevoPartido = {};
    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'PartidoModal.html',
            controller: 'CreatePartidoModalCtrl',
            resolve: {
                modalTitle: function() { return 'create' },
                selectedTorneo: function() { return $scope.selectedTorneo }
            }
        });

        modalInstance.result.then(function (nuevoPartido) {
            $http.post('api/partidos', nuevoPartido).success(function(data) {
                $scope.searchPartidos();
            }).error(function(error) {
                alert('Ocurrio un error al crear el Partido');
                console.log(error);
            });
        });
    }


    $scope.removePartido = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true) {
            $http.post('api/partidos/delete/' + row.partido_id).success(function(data) {
                $scope.searchPartidos();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar el Partido');
            })
        }
    }

    $scope.updatePartido = function(row) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'PartidoModal.html',
            controller: 'UpdatePartidoModalCtrl',
            resolve: {
                partido: function () {
                    return {
                        partido_id: row.partido_id,
                        equipo_a: row.equipo_a,
                        equipo_b: row.equipo_b,
                        goles_a: row.goles_a,
                        goles_b: row.goles_b,
                        fecha: row.fecha,
                        dia: row.dia,
                        torneo_id: row.torneo_id
                    };
                },
                modalTitle: function() { return 'create' },
                selectedTorneo: function() { return $scope.selectedTorneo }
            }
        });

        modalInstance.result.then(function (partido) {
            partido._method = 'PUT';
            $http.post('api/partidos/' + row.partido_id, partido).success(function(data) {
                $scope.searchPartidos();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al editar el Partido');
            });
        });
    }

}]);

angular.module('TorneoLuefiAdminApp').controller('CreatePartidoModalCtrl', function ($scope, $http, $uibModalInstance, modalTitle, selectedTorneo) {

    $scope.partido = {};

    $scope.selectedEquipoA = '';
    $scope.selectedEquipoB = '';

    $http.get('api/equipos').success(function(data) {
        $scope.equipos = data;
    });

    $scope.ok = function() {
        $scope.partido.equipo_a = $scope.selectedEquipoA
        $scope.partido.equipo_b = $scope.selectedEquipoB
        $scope.partido.torneo_id = selectedTorneo;
        console.log(selectedTorneo);
        console.log($scope.partido);
        $uibModalInstance.close($scope.partido);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('TorneoLuefiAdminApp').controller('UpdatePartidoModalCtrl', function ($scope, $http, $uibModalInstance, partido, modalTitle, selectedTorneo) {

    $scope.partido = partido;

    $scope.selectedEquipoA = '';
    $scope.selectedEquipoB = '';

    $http.get('api/equipos').success(function(data) {
        $scope.equipos = data;

        angular.forEach($scope.equipos, function(equipo, key) {
            if (equipo.equipo_id == partido.equipo_a.equipo_id) {
                $scope.selectedEquipoA = equipo.equipo_id;
            }
            if (equipo.equipo_id == partido.equipo_b.equipo_id) {
                $scope.selectedEquipoB = equipo.equipo_id;
            }
        });
    });

    $scope.ok = function() {
        $scope.partido.equipo_a = $scope.selectedEquipoA
        $scope.partido.equipo_b = $scope.selectedEquipoB
        $scope.partido.torneo_id = selectedTorneo;
        $uibModalInstance.close($scope.partido);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
