'use strict';

angular.module('TorneoLuefiAdminApp')
.controller('GalleryCtrl', [ '$scope', '$http', '$state', '$uibModal', '$auth','Upload', function ($scope, $http, $state, $uibModal, $auth, Upload) {

    if (!$auth.isAuthenticated()) {
        $state.go('auth');
    }

    function listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;

        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(list[i]);
        }

        return matrix;
    }

    $scope.selectedCategory;
    $scope.$watch('selectedCategory', function() {

        getImagesFromGallery();
    });

    function getImagesFromGallery() {
        if ($scope.selectedCategory != null) {
            $http.get('api/gallery/' + $scope.selectedCategory.id).success(function(data) {
                $scope.imagesCollection = listToMatrix(data, 3);
            });
        } else {
            $scope.imagesCollection = null;
        }
    }

    $scope.showSubmitButton = function () {
        return ($scope.file && $scope.selectedCategory);
    };

    $scope.getGalleries = function() {
        $http.get('api/gallery').success(function(data) {
            $scope.galleriesCollection = data;
        });
    };
    $scope.getGalleries();

    $scope.openForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'galleryModal.html',
            controller: 'CreateGalleryModalCtrl',
            resolve: {
                modalTitle: function () { return 'Create' }
            }
        });

        modalInstance.result.then(function (nuevoGallery) {
            $http.post('api/gallery', nuevoGallery).success(function(data) {
                $scope.getGalleries();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al crear la Gallery');
            });
        });
    }


    $scope.removeGallery = function (row) {
        var c = confirm('Esta seguro?');
        if (c == true) {
            $http.post('api/gallery/delete/' + row.id).success(function(data) {
                $scope.getGalleries();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar la Galeria. Puede ser que existan imagenes asociadas a esta galeria.');
            })
        }
    }

    $scope.updateGallery = function(row) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'galleryModal.html',
            controller: 'UpdateGalleryModalCtrl',
            resolve: {
                gallery: function () {
                    return { id: row.id, nombre: row.nombre };
                },
                modalTitle: function () { return 'Update' }
            }
        });

        modalInstance.result.then(function (gallery) {
            gallery._method = 'PUT';
            $http.post('api/gallery/' + row.id, gallery).success(function(data) {
                $scope.getGalleries();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al editar la Galeria');
            });
        });

    }

    $scope.submit = function() {
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
    };

    $scope.upload = function (file) {

        Upload.upload({
            url: 'api/gallery/upload',
            data: { file: file, galleryid: $scope.selectedCategory.id }
        }).then(function (resp) {
            $scope.file = null;
            alert('La imagen se subio correctamente');
            $scope.getGalleries();
        }, function (resp) {
            console.log(resp.data);
        }, function (evt) {
            // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

    };

    $scope.removeImageFromGallery = function (image) {
        var c = confirm('Esta seguro?');
        if (c == true) {
            $http.post('api/gallery/image/delete/' + image.id).success(function(data) {
                getImagesFromGallery();
            }).error(function(error) {
                console.log(error);
                alert('Ocurrio un error al borrar el equipo');
            });
        }
    }

}]);

angular.module('TorneoLuefiAdminApp').controller('CreateGalleryModalCtrl', function ($scope, $uibModalInstance, modalTitle) {

    $scope.gallery = {};
    $scope.modalTitle = modalTitle;

    $scope.ok = function() {
        $uibModalInstance.close($scope.gallery);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('TorneoLuefiAdminApp').controller('UpdateGalleryModalCtrl', function ($scope, $uibModalInstance, gallery, modalTitle) {

    $scope.gallery = gallery;
    $scope.modalTitle = modalTitle;

    $scope.ok = function() {
        $uibModalInstance.close($scope.gallery);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
