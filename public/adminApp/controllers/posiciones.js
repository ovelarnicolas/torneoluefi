'use strict';

/**
* @ngdoc function
* @name TorneoLuefiAdminApp.controller:PosicionesCtrl
* @description
* # PosicionesCtrl
* Controller of the TorneoLuefiAdminApp
*/

angular.module('TorneoLuefiAdminApp')
.controller('PosicionesCtrl', [ '$scope', '$http', '$uibModal', '$state', '$auth', function ($scope, $http, $uibModal, $state, $auth) {

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

    $scope.searchTablaPosiciones = function() {
        $scope.showGrid = true;
    };

    // $scope.searchTablaPosiciones = function() {
    //     $http.get('api/posiciones/?zona=' + $scope.selectedZona).success(function(data) {
    //         $scope.partidosCollection = data;
    //         $scope.showGrid = true;
    //     });
    // };

    $scope.PosicionesCollection = [];

    $scope.getPosiciones = function() {
        $http.get('api/posiciones').success(function(data) {
            $scope.PosicionesCollection = data;
        });
    }
    $scope.getPosiciones();

    $scope.nuevoPosicion = {};
    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'PosicionModal.html',
            controller: 'CreatePosicionModalCtrl',
            resolve: {
                modalTitle: function () { return 'create' },
                selectedTorneo: function () { return $scope.selectedTorneo }
            }
        });

        modalInstance.result.then(function (nuevoPosicion) {
            console.log(nuevoPosicion);
            $http.post('api/posiciones', nuevoPosicion).success(function(data) {
                console.log('created');
                $scope.getPosiciones();
            }).error(function(error) {
                alert('Ocurrio un error al crear la Posicion');
                console.log(error);
            });
        });
    }


    $scope.removePosicion = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true) {
            $http.post('api/posiciones/delete/' + row.id).success(function(data) {
                console.log('deleted');
                $scope.getPosiciones();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar la Posicion');
            })
        }
    }

    $scope.updatePosicion = function(row) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'PosicionModal.html',
            controller: 'UpdatePosicionModalCtrl',
            resolve: {
                posicion: function () {
                    return { id: row.id, equipo_id: row.equipo_id, torneo_id: row.torneo_id, partidos_jugados: row.partidos_jugados, puntos: row.puntos };
                },
                modalTitle: function () { return 'update' },
                // selectedEquipo: function () { return row.equipo_id },
                // selectedTorneo: function () { return row.torneo_id }
            }
        });

        modalInstance.result.then(function (posicion) {
            posicion._method = 'PUT';
            $http.post('api/posiciones/' + row.id, posicion).success(function(data) {
                console.log(data);
                $scope.getPosiciones();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al editar la Posicion');
            });
        });

    }

}]);

angular.module('TorneoLuefiAdminApp').controller('CreatePosicionModalCtrl', function ($scope, $http, $uibModalInstance, modalTitle, selectedTorneo) {

    $scope.posicion = {};
    $scope.modalTitle = modalTitle;

    $scope.selectedEquipo = '';
    $scope.selectedTorneo = selectedTorneo;

    $http.get('api/equipos').success(function(data) {
        $scope.equipos = data;
    });

    $scope.ok = function() {
        $scope.posicion.equipo_id = $scope.selectedEquipo;
        $scope.posicion.torneo_id = $scope.selectedTorneo;

        $uibModalInstance.close($scope.posicion);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('TorneoLuefiAdminApp').controller('UpdatePosicionModalCtrl', function ($scope, $http, $uibModalInstance, $filter, posicion, modalTitle) {

    $scope.posicion = posicion;
    $scope.modalTitle = modalTitle;

    $http.get('api/equipos').success(function(data) {
        $scope.equipos = data;

        angular.forEach($scope.equipos, function(equipo, key) {
            if (equipo.equipo_id == posicion.equipo_id) {
                $scope.selectedEquipo = equipo.equipo_id;
            }
        });
    });

    $scope.ok = function() {
        $scope.posicion.equipo_id = $scope.selectedEquipo;
        $uibModalInstance.close($scope.posicion);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
