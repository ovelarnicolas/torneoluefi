'use strict';

/**
* @ngdoc function
* @name TorneoLuefiAdminApp.controller:EquiposCtrl
* @description
* # EquiposCtrl
* Controller of the TorneoLuefiAdminApp
*/

angular.module('TorneoLuefiAdminApp')
.controller('EquiposCtrl', [ '$scope', '$http', '$uibModal', '$state', '$auth', function ($scope, $http, $uibModal, $state, $auth) {

    if (!$auth.isAuthenticated()) {
        $state.go('auth');
    }

    $scope.equiposCollection = [];

    $scope.getEquipos = function() {
        $http.get('api/equipos').success(function(data) {
            $scope.equiposCollection = data;
        });
    }
    $scope.getEquipos();

    $scope.nuevoEquipo = {};
    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'EquipoModal.html',
            controller: 'CreateEquipoModalCtrl',
            resolve: {
                modalTitle: function () { return 'Nuevo' }
            }
        });

        modalInstance.result.then(function (nuevoEquipo) {
            console.log(nuevoEquipo);
            $http.post('api/equipos', nuevoEquipo).success(function(data) {
                console.log('created');
                $scope.getEquipos();
            }).error(function(error) {
                alert('Ocurrio un error al crear el equipo');
                console.log(error);
            });
        });
    }


    $scope.removeEquipo = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true) {            
            $http.post('api/equipos/delete/' + row.equipo_id).success(function(data) {
                console.log('deleted');
                $scope.getEquipos();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar el equipo');
            })
        }
    }

    $scope.updateEquipo = function(row) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'EquipoModal.html',
            controller: 'UpdateEquipoModalCtrl',
            resolve: {
                equipo: function () {
                    return { equipo_id: row.equipo_id, nombre: row.nombre, escudo: row.escudo };
                },
                modalTitle: function () { return 'Editar' }
            }
        });

        modalInstance.result.then(function (equipo) {
            equipo._method = 'PUT';
            $http.post('api/equipos/' + row.equipo_id, equipo).success(function(data) {
                console.log(data);
                $scope.getEquipos();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al editar el equipo');
            });
        });

    }

}]);

angular.module('TorneoLuefiAdminApp').controller('CreateEquipoModalCtrl', ['$scope', '$http', '$uibModalInstance', 'Upload', 'modalTitle', function ($scope, $http, $uibModalInstance, Upload, modalTitle) {

    $scope.equipo = {};
    $scope.modalTitle = modalTitle;

    $scope.ok = function() {
        if ($scope.file) {
            Upload.upload({
                url: 'api/equipos/UploadEscudo',
                data: { file: $scope.file, equipo: $scope.equipo.nombre }
            }).then(function (resp) {
                console.log(resp.data);
                $scope.file = null;
                $scope.equipo.escudo = resp.data.image;
                console.log($scope.equipo.escudo);
                $uibModalInstance.close($scope.equipo);
            }, function (resp) {
                console.log(resp.data);
            });
        } else {
            $uibModalInstance.close($scope.equipo);
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

angular.module('TorneoLuefiAdminApp').controller('UpdateEquipoModalCtrl', ['$scope', '$http', '$uibModalInstance', 'Upload', 'equipo', 'modalTitle', function ($scope, $http, $uibModalInstance, Upload, equipo, modalTitle) {

    $scope.equipo = equipo;
    $scope.modalTitle = modalTitle;
    // $scope.file =  equipo.file;


    $scope.ok = function() {
        if ($scope.file) {
            Upload.upload({
                url: 'api/equipos/UploadEscudo',
                data: { file: $scope.file, equipoid: $scope.equipo.equipo_id, equipo: $scope.equipo.nombre }
            }).then(function (resp) {
                $scope.file = null;
                $scope.equipo.escudo = resp.data.image;
                $uibModalInstance.close($scope.equipo);
                alert('La imagen se subio correctamente');
            }, function (resp) {
                console.log(resp.data);
            });
        } else {
            $uibModalInstance.close($scope.equipo);
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
