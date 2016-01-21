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
        .controller('uploadImgCropCtrl', ['$rootScope', '$scope', '$modalInstance', 'modalObj', '$sce', 'Upload', 'piHttp', '$timeout', 'pi.core.file.fileSvc',
          function($rootScope, $scope, $modalInstance, modalObj, $sce, Upload, piHttp, $timeout, fileSvc) {

            $scope.mediaSelected = false;
            $scope.mediaUri = '';
            $scope.mediaCropped = '';
            $scope.view = 'home';
            $scope.files = [];

            var handleFileSelect=function(evt) {
              var file=evt.currentTarget.files[0];
              var reader = new FileReader();
              reader.onload = function (evt) {
                $scope.$apply(function($scope){
                  $scope.cropFile(evt.target.result);
                });
              };
              reader.readAsDataURL(file);
            };
            $timeout(function(){
                angular.element(document.querySelector('#mediaUploadBtn')).on('change',handleFileSelect);
            }, 0);

            $scope.cancel = function(){
              $modalInstance.dismiss();
            }

            $scope.viewList = function() {
              fileSvc.find()
                .then(function(res) {
                  angular.forEach(res.data.files, function(file) {
                    $scope.files.push(file);
                  });
                  $scope.view = 'list';
                });
            }

            $scope.viewHome = function() {
              $scope.view = 'home';
            }

            $scope.cropFile = function(uri) {
              $scope.mediaUri = uri;
              $scope.view = 'crop';
            }

            function dataURLtoBlob(dataurl) {
              var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
              while(n--){
                  u8arr[n] = bstr.charCodeAt(n);
              }
              return new Blob([u8arr], {type:mime});
            }

            $scope.uploadCropped = function() {
              var url = piHttp.getBaseUrl() + '/filesystem',
                  fileType = $scope.mediaUri.substring($scope.mediaUri.lastIndexOf(":")+1,$scope.mediaUri.lastIndexOf(";")),
                  extension = '';

              switch(fileType) {
                case "image/png":
                  extension = ".png";
                  break;
                case "image/jpg":
                  extension = ".jpg";
                  break;
                case "image/jpeg":
                  extension = ".jpeg";
                  break;
              }

              var blob = dataURLtoBlob($scope.mediaCropped),
                  file = new File([blob], "uploaded" + extension, {
                    lastModified: new Date(0),
                    type: fileType
                  });

              Upload.upload({
                  url: url,
                  fields: {},
                  file: file
              }).progress(function (evt) {
                  $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
              }).success(function (data, status, headers, config) {
                  $modalInstance.close(data);
              });
            }
        }])
        .directive('piMediaUploadTrigger', ['uploadImgCropModal',
          function(uploadImgCropModal) {
            return {
              require: ['^ngModel'],

              link: function(scope, elem, attrs, controllersArr) {

                elem.bind('click', function(){
                    uploadImgCropModal.open()
                      .then(function(file) {
                        controllersArr[0].$setViewValue(file.uri);
                      });
                });

                attrs.$observe('ngModel', function(value){ // Got ng-model bind path here
                  scope.$watch(value,function(newValue){ // Watch given path for changes
                      scope.thumbnailSrc = _.isString(controllersArr[0].$viewValue) ? controllersArr[0].$viewValue : 'http://fitting.pt/dist/images/event-thumbnail.jpg';
                  });
               });
              }
            }
        }])
        .directive('piMediaUpload', ['Upload', 'piHttp', function(Upload, piHttp){
          return {
            replace: false,

            controller: function($scope) {

            }
          }
        }])
        .directive('piMediaUploadBtn', ['Upload', 'piHttp', function(Upload, piHttp){

            /*
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
            */
        return {
          require: '^piMediaUpload',
            scope: {

            },
            templateUrl: 'core/pi-media-upload-btn.tpl.html'
        }
    }]);
})();
