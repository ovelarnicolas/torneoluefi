'use strict';

/**
* @ngdoc function
* @name TorneoLuefiAdminApp.controller:ZonasCtrl
* @description
* # ZonasCtrl
* Controller of the TorneoLuefiAdminApp
*/

angular.module('TorneoLuefiAdminApp')
.controller('ZonasCtrl', [ '$scope', '$http', '$uibModal', '$state', '$auth', function ($scope, $http, $uibModal, $state, $auth) {

    if (!$auth.isAuthenticated()) {
        $state.go('auth');
    }
    $scope.zonasCollection = [];

    $scope.getZonas = function() {
        $http.get('api/zonas').success(function(data) {
            console.log(data);
            $scope.zonasCollection = data;
        });
    }
    $scope.getZonas();

    $scope.nuevoZona = {};
    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'ZonaModal.html',
            controller: 'CreateZonaModalCtrl',
            resolve: {
                modalTitle: function () { return 'create' }
            }
        });

        modalInstance.result.then(function (nuevoZona) {
            console.log(nuevoZona);
            $http.post('api/zonas', nuevoZona).success(function(data) {
                console.log('created');
                $scope.getZonas();
            }).error(function(error) {
                alert('Ocurrio un error al crear la Zona');
                console.log(error);
            });
        });
    }


    $scope.removeZona = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true) {
            $http.post('api/zonas/delete/' + row.id).success(function(data) {
                console.log('deleted');
                $scope.getZonas();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar la Zona');
            })
        }
    }

    $scope.updateZona = function(row) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'ZonaModal.html',
            controller: 'UpdateZonaModalCtrl',
            resolve: {
                zona : row,
                modalTitle: function () { return 'update' }
            }
        });

        modalInstance.result.then(function (zona) {
            zona._method = 'PUT';
            $http.post('api/zonas/' + row.id, zona).success(function(data) {
                $scope.getZonas();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al editar la Zona');
            });
        });

    }

}]);

angular.module('TorneoLuefiAdminApp').controller('CreateZonaModalCtrl', function ($scope, $uibModalInstance, modalTitle, $http) {

    $scope.zona = {};
    $scope.modalTitle = modalTitle;
    $scope.selectedDivision = '';

    $http.get('api/divisiones').success(function(data) {
        $scope.divisionList = data;
    });

    $scope.ok = function() {
        $scope.zona.division_id = $scope.selectedDivision;
        $uibModalInstance.close($scope.zona);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('TorneoLuefiAdminApp').controller('UpdateZonaModalCtrl', function ($scope, $uibModalInstance, zona, modalTitle, $http) {

    $scope.zona = zona;
    $scope.modalTitle = modalTitle;
    $scope.selectedDivision = '';

    $http.get('api/divisiones').success(function(data) {
        $scope.divisionList = data;
    });

    $scope.ok = function() {
        $scope.zona.division_id = $scope.selectedDivision;
        $uibModalInstance.close($scope.zona);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
