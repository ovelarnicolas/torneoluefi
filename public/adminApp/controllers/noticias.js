'use strict';

/**
* @ngdoc function
* @name TorneoLuefiAdminApp.controller:NoticiasCtrl
* @description
* # NoticiasCtrl
* Controller of the TorneoLuefiAdminApp
*/

angular.module('TorneoLuefiAdminApp')
.controller('NoticiasCtrl', [ '$scope', '$http', '$uibModal', '$state', '$auth', function ($scope, $http, $uibModal, $state, $auth) {

    if (!$auth.isAuthenticated()) {
        $state.go('auth');
    }

    $scope.NoticiasCollection = [];

    $scope.getNoticias = function() {
        $http.get('api/noticias').success(function(data) {
            $scope.NoticiasCollection = data;
        });
    }
    $scope.getNoticias();

    $scope.nuevoNoticia = {};
    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'NoticiaModal.html',
            controller: 'CreateNoticiaModalCtrl',
            resolve: {
                modalTitle: function () { return 'create' }
            }
        });

        modalInstance.result.then(function (nuevoNoticia) {
            console.log(nuevoNoticia);
            $http.post('api/noticias', nuevoNoticia).success(function(data) {
                $scope.getNoticias();
            }).error(function(error) {
                alert('Ocurrio un error al crear la Noticia');
                console.log(error);
            });
        });
    }


    $scope.removeNoticia = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true){
            $http.post('/api/noticias/delete/' + row.id).success(function(data) {
                console.log('deleted');
                $scope.getNoticias();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar la Noticia');
            })
        }
    }

    $scope.updateNoticia = function(row) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'NoticiaModal.html',
            controller: 'UpdateNoticiaModalCtrl',
            resolve: {
                noticia: function () {
                    return { id: row.id, titulo: row.titulo, mensaje: row.mensaje, subtitulo: row.subtitulo };
                },
                modalTitle: function () { return 'update' }
            }
        });

        modalInstance.result.then(function (noticia) {
            noticia._method = 'PUT';
            $http.post('api/noticias/' + row.id, noticia).success(function(data) {
                console.log(data);
                $scope.getNoticias();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al editar la Noticia');
            });
        });

    }

}]);

angular.module('TorneoLuefiAdminApp').controller('CreateNoticiaModalCtrl', function ($scope, $http, $uibModalInstance, modalTitle) {

    $scope.noticia = {};
    $scope.modalTitle = modalTitle;

    $scope.ok = function() {
        $uibModalInstance.close($scope.noticia);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('TorneoLuefiAdminApp').controller('UpdateNoticiaModalCtrl', function ($scope, $http, $uibModalInstance, noticia, modalTitle) {

    $scope.noticia = noticia;
    $scope.modalTitle = modalTitle;

    $scope.ok = function() {
        $uibModalInstance.close($scope.noticia);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
