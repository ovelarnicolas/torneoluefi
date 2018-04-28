'use strict';

/**
* @ngdoc function
* @name TorneoLuefiAdminApp.controller:TorneosCtrl
* @description
* # TorneosCtrl
* Controller of the TorneoLuefiAdminApp
*/

angular.module('TorneoLuefiAdminApp')
.controller('TorneosCtrl', [ '$scope', '$http', '$uibModal', '$state', '$auth', function ($scope, $http, $uibModal, $state, $auth) {

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

    $scope.torneosCollection = [];

    $scope.getTorneos = function() {
        $http.get('api/torneos').success(function(data) {
            $scope.torneosCollection = data;
        });
    }

    $scope.update = function() {
        $scope.showGrid = false;
    }

    $scope.getTorneos();

    $http.get('api/divisiones').success(function(data) {
        $scope.divisiones = data;
    });

    $scope.searchTorneos = function() {
        $scope.showGrid = true;
    };

    $scope.nuevoTorneo = {};
    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'TorneoModal.html',
            controller: 'CreateTorneoModalCtrl',
            resolve: {
                modalTitle: function () { return 'Create' }
            }
        });

        modalInstance.result.then(function (nuevoTorneo) {
            console.log(nuevoTorneo);
            $http.post('api/torneos', nuevoTorneo).success(function(data) {
                console.log(data);
                $scope.getTorneos();
            }).error(function(error) {
                alert('Ocurrio un error al crear el Torneo');
                console.log(error);
            });
        });
    }

    $scope.removeTorneo = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true) {
            $http.post('api/torneos/delete/' + row.torneo_id).success(function(data) {
                $scope.getTorneos();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar el Torneo');
            })
        }
    }

    $scope.updateTorneo = function(row) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'TorneoModal.html',
            controller: 'UpdateTorneoModalCtrl',
            resolve: {
                torneo: function () {
                    return { torneo_id: row.torneo_id, nombre_torneo: row.nombre_torneo, zona: row.zona.nombre, zona_id: row.zona.id };
                },
                modalTitle: function () { return 'Update' }
            }
        });

        modalInstance.result.then(function (torneo) {
            torneo._method = 'PUT';
            $http.post('api/torneos/' + row.torneo_id, torneo).success(function(data) {
                $scope.getTorneos();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al editar el Torneo');
            });
        });
    }
}]);

angular.module('TorneoLuefiAdminApp').controller('CreateTorneoModalCtrl', function ($scope, $http, $uibModalInstance, modalTitle) {

    $scope.torneo = {};
    $scope.modalTitle = modalTitle;
    $scope.selectedZona = '';

    $http.get('api/zonas').success(function(data) {
        $scope.zonas = data;
    });

    $scope.ok = function() {
        $scope.torneo.zona_id = $scope.selectedZona;
        $uibModalInstance.close($scope.torneo);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('TorneoLuefiAdminApp').controller('UpdateTorneoModalCtrl', function ($scope, $http, $uibModalInstance, torneo, modalTitle) {

    $scope.torneo = torneo;
    $scope.modalTitle = modalTitle;
    $scope.selectedZona = '';

    $http.get('api/zonas').success(function(data) {
        $scope.zonas = data;

        angular.forEach($scope.zonas, function(zona, key) {
            if (zona.id == torneo.zona_id) {
                $scope.selectedZona = zona.id;
            }
        });
    });

    $scope.ok = function() {
        $scope.torneo.zona_id = $scope.selectedZona;
        $uibModalInstance.close($scope.torneo);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
