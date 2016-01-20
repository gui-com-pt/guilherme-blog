(function(){
    'use strict';

    angular
        .module('codigo')
        .factory('uploadImgCropModal', ['$q', '$modal', function($q, $modal) {

          this.open = function() {
            var deferred = $q.defer();
            var instance = $modal.open({
                templateUrl: 'core/pi-media-upload.tpl.html',
                controller: 'uploadImgCropCtrl',
                resolve: {
                    modalObj: function() {
                        var res = {};
                        return res;
                    }
                }
            });

            instance.result.then(function(res) {
                deferred.resolve(res);
            }, function(res) {
                deferred.reject(res);
            });

            return deferred.promise;
          }
          return this;
        }])
        .controller('uploadImgCropCtrl', ['$rootScope', '$scope', '$modalInstance', 'modalObj', '$sce',
          function($rootScope, $scope, $modalInstance, modalObj, $sce) {

        }])
        .directive('piMediaUploadTrigger', ['uploadImgCropModal',
          function(uploadImgCropModal) {
            return {
              link: function(scope, elem, attrs) {
                elem.bind('click', function(){
                    uploadImgCropModal.open();
                })
              }
            }
        }])
        .directive('piMediaUpload', [function(){
          return {
            controller: function($scope) {
              $scope.mediaSelected = false;

              this.uploaded = function(uri) {
                $scope.mediaUri = uri;
                $scope.mediaSelected = true;
              }
            }
          }
        }])
        .directive('piMediaUploadBtn', ['Upload', 'piHttp', function(Upload, piHttp){
          var linkFn = function(scope, elem, attrs, piMediaUploadCtrl){
            var self = this;

            scope.$watch('files', function () {
                scope.upload(scope.files);
            });

            scope.upload = function (files) {

                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var url = piHttp.getBaseUrl() + '/filesystem';

                        Upload.upload({
                            url: url,
                            fields: {},
                            file: file
                        }).progress(function (evt) {
                            scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                        }).success(function (data, status, headers, config) {
                            piMediaUploadCtrl.uploaded(data.uri);
                            scope.thumbnailSrc = data.uri;
                        });
                    }
                }
            };

            scope.getTemplate = function(){
                if(!_.isUndefined(attrs.piTemplate)){
                    return attrs.piTemplate;
                }

                return 'core/pi-media-upload-btn.tpl.html';
            }
        };

        return {
          require: '^piMediaUpload',
            scope: {

            },
            link: linkFn,
            template: '<ng-include class="upload-thumbnail-trigger" src="getTemplate()"></ng-include>'
        }
    }]);
})();
