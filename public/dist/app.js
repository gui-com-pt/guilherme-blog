(function(){
"use restrict";
function getCookie(cname) {
        var name = cname + "=",
            ca = document.cookie.split(';'),
            i,
            c,
            ca_length = ca.length;
        for (i = 0; i < ca_length; i += 1) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) !== -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(variable, value, expires_seconds) {
        var d = new Date();
        d = new Date(d.getTime() + 1000 * expires_seconds);
        document.cookie = variable + '=' + value + '; expires=' + d.toGMTString() + ';';
    }
    
    var boot = function(){
         var initInjector = angular.injector(['ng']);
          var $http = initInjector.get('$http');
          var _response;

          $http.get('https://guilherme.ovh/api/init').then(
              function(response) {
                  _response = response;
                  angular.module('config', []).constant('codigoModel', _response.data);

                  angular.element(document).ready(function() {
                      angular.bootstrap(document, ['codigo']);
                  });
              }
          );
  }

  boot();

    angular
        .module('templates', []);

    angular
        .module('codigo.core', ['codigo']);

    angular
        .module('codigo.core.article', ['codigo.core']);

    angular
        .module('codigo.core.question', ['codigo.core']);

  angular
    .module('codigo', ['templates', 'pi.core', 'pi.core.app', 'pi.core.question', 'pi.core.payment', 'pi.core.chat', 'pi.core.likes', 'pi.core.product', 'codigo.core', 'codigo.core.article', 'codigo.core.question',
  'pi.core.file','pi.googleAdsense', 'ngImgCrop', 'pi.common',
      'ui.router', 'ui.bootstrap.modal', 'textAngular', 'infinite-scroll', 'ngFileUpload', 'ui.select', 'angularMoment', 'pi',
      'piClassHover', 'ngTagsInput', '720kb.socialshare', 'wu.masonry', 'config', 'angular-bind-html-compile']);

  angular
    .module('codigo')
      .config(['facebookMetaServiceProvider', 'piHttpProvider', '$locationProvider', '$stateProvider', 'uiSelectConfig', '$provide', 'tagsInputConfigProvider', '$httpProvider', '$urlRouterProvider', 'googleAdsenseConfigProvider', function(facebookMetaServiceProvider, piHttpProvider, $locationProvider, $stateProvider, uiSelectConfig, $provide, tagsInputConfigProvider, $httpProvider, $urlRouterProvider, googleAdsenseConfigProvider){

        googleAdsenseConfigProvider.setClient('ca-pub-1750926490246398');
        googleAdsenseConfigProvider.setSlot('5417208575');

        $urlRouterProvider.otherwise('/');

        piHttpProvider.setBaseUrl('https://guilherme.ovh/api');

        facebookMetaServiceProvider.setAuthor('https://www.facebook.com/living.with.jesus');
        facebookMetaServiceProvider.setPublisher('https://www.facebook.com/codigo.ovh');
        facebookMetaServiceProvider.setSiteName('Codigo');
        facebookMetaServiceProvider.setType('article');
        facebookMetaServiceProvider.setLocale('en_US');
        $urlRouterProvider.otherwise('/');
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);

        if(_.isString(getCookie('Authorization'))){
          var c = getCookie('Authorization');
          if(_.isString(c) && c.length > 4) {
            $httpProvider.defaults.headers.common["WWW-Authenticate"] = 'Basic ' + c;
          }
        }

        tagsInputConfigProvider
          .setDefaults('tagsInput', {
            placeholder: 'Nova Tag',
            minLength: 5,
            addOnEnter: false
          })
          .setDefaults('autoComplete', {
            debounceDelay: 200,
            loadOnDownArrow: true,
            loadOnEmpty: true
          });

          uiSelectConfig.theme = 'selectize';
          $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
              taOptions.toolbar = [
                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                  ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
                  ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                  ['html', 'insertImage','insertLink', 'insertVideo', 'wordcount', 'charcount']
              ];

              taRegisterTool('titulo', {
                  iconclass: "fa fa-square red",
                  buttonText:' Titulo',
                  action: function(){
                      return this.$editor().wrapSelection("formatBlock", "<h2>");
                  }
              });
              taOptions.toolbar[0].push('titulo');


              taOptions.classes = {
                  focussed: 'focussed',
                  toolbar: 'btn-toolbar',
                  toolbarGroup: 'btn-group',
                  toolbarButton: 'btn btn-default',
                  toolbarButtonActive: 'active',
                  disabled: 'disabled',
                  textEditor: 'form-control',
                  htmlEditor: 'form-control'
              };
              return taOptions;
          }]);


          $stateProvider
              .state('home', {
                  url: '/not-active',
                  templateUrl: 'core/home.tpl.html',
                  controller: 'codigo.core.homeCtrl',
                  controllerAs: 'ctrl'
              })
              .state('server-side', {
                url: '/server-side',
                templateUrl: 'core/server-side.tpl.html'
              })
              .state('client-side', {
                url: '/client-side',
                templateUrl: 'core/client-side.tpl.html'
              })
              .state('php', {
                url: '/php',
                templateUrl: 'core/php-hhvm.tpl.html'
              })
              .state('csharp', {
                url: '/csharp',
                templateUrl: 'core/csharp.tpl.html'
              })
              .state('sysadmin', {
                url: '/sysadmin',
                templateUrl: 'core/sysadmin.tpl.html'
              })
              .state('learn', {
                url: '/aprende-comigo',
                templateUrl: 'core/learn.tpl.html',
                controller: 'codigo.core.learnCtrl',
                controllerAs: 'ctrl'
              })
              .state('cv', {
                url: '/curriculum-vitae',
                templateUrl: 'core/cv.tpl.html'
              })
              .state('login', {
                url: '/login',
                templateUrl: 'core/login.tpl.html',
                controller: 'codigo.core.loginCtrl',
                controllerAs: 'ctrl'
              })
              .state('question-list',{
                  url: '/perguntas',
                  templateUrl: 'core/question/question-list.tpl.html',
                  controller: 'codigo.core.question.questionListCtrl',
                  controllerAs: 'ctrl'
              })
              .state('question-view', {
                  url: '/question/:id',
                  templateUrl: 'core/question/question-view.tpl.html',
                  controller: 'codigo.core.question.questionViewCtrl',
                  controllerAs: 'ctrl'
              })
              .state('category-create', {
                  url: '/categoria-nova',
                  templateUrl: 'core/article/category-create.tpl.html',
                  controller: 'codigo.core.article.categoryCreateCtrl',
                  controllerAs: 'ctrl'
              })
              .state('category-save', {
                  url: '/categoria-editar/:id',
                  templateUrl: 'core/article/category-save.tpl.html',
                  controller: 'codigo.core.article.categorySaveCtrl',
                  controllerAs: 'ctrl'
              })
              .state('category-list',{
                  url: '/categorias',
                  templateUrl: 'core/article/category-list.tpl.html',
                  controller: 'codigo.core.article.categoryListCtrl',
                  controllerAs: 'ctrl'
              })
              .state('article-list', {
                  url: '/?name&categoryId',
                  templateUrl: 'core/article/article-list.tpl.html',
                  controller: 'codigo.core.article.articleListCtrl',
                  controllerAs: 'ctrl'
              })
              .state('article-create', {
                  url: '/artigo-novo',
                  templateUrl: 'core/article/article-create.tpl.html',
                  controller: 'codigo.core.article.articleCreateCtrl',
                  controllerAs: 'ctrl'
              })
              .state('article-save', {
                  url: '/artigo-editar/:id',
                  templateUrl: 'core/article/article-save.tpl.html',
                  controller: 'codigo.core.article.articleSaveCtrl',
                  controllerAs: 'ctrl'
              })
              .state('article-view', {
                  url: '/blog/:categories/:name--:id',
                  templateUrl: 'core/article/article-view.tpl.html',
                  controller: 'codigo.core.article.articleViewCtrl',
                  controllerAs: 'ctrl'
              });

      }])
    .run(['$rootScope', 'pi.core.article.articleCategorySvc', '$state', 'codigoModel', '$window', '$location',
      function($rootScope, categorySvc, $state, codigoModel, $window, $location){
        $rootScope.$location = $location;

        $rootScope.isAuthenticated = codigoModel.isAuthenticated;
        $rootScope.codigoModel = codigoModel;

        $rootScope.search = function(value) {
          $state.go('article-list', {name: value, categoryId: null});
        }

        $rootScope.$on('$locationChangeStart', function () {
          Object.keys($window).filter(function(k) { return k.indexOf('google') >= 0 }).forEach(
            function(key) {
              delete($window[key]);
            }
          );
        });

        categorySvc.find({take: 100})
          .then(function(res){
            $rootScope.categories = res.data.categories;
          });
    }]);
})();


function baseListCtrl($scope, $stateParams) {
  var self = this;

  this.perPage = 12;
  this.results = [];

  this.queryModel = {
      busy: false
  };

  function getModelFromStateParams(names, model){

      angular.forEach(names, function(value){
          if(!_.isUndefined($stateParams[value])) {
              model[value] = $stateParams[value];
          }
      });

      return model;
  }

  this.getQueryModel = function(stateKeys){
      var model = {skip: this.results.length, take: this.perPage};
      getModelFromStateParams(stateKeys, model);
      return model;
  }

  this.query = function() {
      if(this.queryModel.busy) return;
      this.queryModel.busy = true;
      this.getData()
        .then(function(results){
          if(!_.isArray(results) || results.length < 1) return;

          angular.forEach(results, function(item){
              self.results.push(item);
          });

          self.queryModel.busy = false;
      }, function(){
          self.queryModel.busy = false;
      });
  };

  $scope.$on('$destroy', function(){
      self.results = undefined;
  });
}

(function(){
  angular
    .module('codigo')
    .directive('codigoSidebar', ['pi.core.article.articleSvc', function(articleSvc){

      return {
        templateUrl: 'core/codigo-sidebar.tpl.html',
        replace: true,
        link: function(scope, elem, attrs) {
          scope.queryModel = {
            busy: false
          };
          scope.articles = [];

          articleSvc.find({}).then(function(r){

              if(!_.isArray(r.data.articles) || r.data.articles.length < 1) return;

              var articles = _.shuffle(r.data.articles);
              angular.forEach(articles, function(event){
                  scope.articles.push(event);
              });

              scope.queryModel.busy = false;
          }, function(){
              scope.queryModel.busy = false;
          });
        }
      }
    }]);
})();


(function(){
    var SportsNewsListCtrl = function(articleSvc, $scope){
        var self = this;

        this.news = [];

        this.queryModel = {
            busy: false
        };

        $scope.$on('$destroy', function(){
            self.news = undefined;
        });

        this.query = function() {
            if(self.queryModel.busy) return;

            self.queryModel.busy = true;
            articleSvc.find({skip: self.news.length, take: 12}).then(function(r){
                if(r.data.articles.length < 1) return;

                angular.forEach(r.data.articles, function(event){
                    self.news.push(event);
                });

                self.queryModel.busy = false;
            }, function(){
                self.queryModel.busy = false;
            });
        };

    };

    SportsNewsListCtrl.$inject = ['pi.core.article.articleSvc', '$scope'];

    angular
        .module('codigo')
        .controller('codigo.core.homeCtrl', SportsNewsListCtrl);
})();
(function(){
  angular
    .module('codigo')
    .controller('codigo.core.learnCtrl', [function(){

    }]);
})();

(function(){
    var SportsNewsListCtrl = function(articleSvc, $scope){
        var self = this;


        self.loginError = function(){
          alert('erro no login');
        }

        self.loginSuccess = function(){
          alert('success');
        }
    };

    SportsNewsListCtrl.$inject = ['pi.core.article.articleSvc', '$scope'];

    angular
        .module('codigo')
        .controller('codigo.core.loginCtrl', SportsNewsListCtrl);
})();
(function(){
  angular
  .module('codigo')
  .directive('piLoginSubmit', [function(){
    var linkFn = function(scope, element, attrs, piLoginCtrl)
        {
            element.bind('click', function(){
                piLoginCtrl.submit();
            })
        };

        return {
            replace: false,
            link: linkFn,
            require:'^piLogin'
        }
  }])
  .directive('piLogin', ['accountApi', function(accountApi){
    var linkFn = function(scope, elem, attrs)
		{

		};
    var ctrl = function($scope){
      $scope.submit = function()
			{
				var successFn = function(res)
					{
						$scope.onSuccess(res);
					},
					errorFn = function(res)
					{
						$scope.onError(res);
					};

				accountApi.login($scope.email, $scope.password)
					.then(successFn, errorFn);
			};

      this.submit = $scope.submit;

			$scope.cancel = function()
			{

			};
    };
    ctrl.$inject = ['$scope'];

		return {
			scope: {
				'piConfig': '=piConfig',
        'onSuccess': '&',
        'onError': '&'
			},
			link: linkFn,
      controller: ctrl,
      replace: false
		};
  }]);
})();

(function(){
	
	angular
		.module('codigo')
		.provider('socialShare', [function(){

			var socials = ['facebook', 'google', 'twitter'],
				self = this;
			this.available = [];
			this.stacks = [];

			this.$get = function($modal){

				return {
					available: self.available,
					share: function(title, message, image, url, social) {
						self.stacks.push($modal.open({
							templateUrl: 'core/social/social-share-fb.modal.html',
							controller: 'socialShareModalCtrl',
							resolve: {
								image: function(){
									return image;
								},
								title: function(){
									return title;
								},
								message: function(){
									return message;
								}
							}
						}))
					}
				}
			}
			this.$get.$inject = ['$modal'];

			this.setAvailable = function(values) {
				self.available = values;
			}

		}])
		.controller('socialShareModalCtrl', ['$scope', 'title', 'image', 'message', '$modalInstance',
			function($scope, title, image, message, $modalInstance){
			$scope.image = image;
			$scope.title = title;
			$scope.message = message;

			$scope.cancel = function(){
				$modalInstance.dismiss();
			}
		}]);
})();
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
        .controller('uploadImgCropCtrl', ['$rootScope', '$scope', '$modalInstance', 'modalObj', '$sce', 'Upload', 'piHttp', '$timeout', 'pi.core.file.fileSvc', 'fileUtils', '$q',
          function($rootScope, $scope, $modalInstance, modalObj, $sce, Upload, piHttp, $timeout, fileSvc, fileUtils, $q) {

            $scope.mediaSelected = false;
            $scope.queryTake = 24;
            $scope.mediaUri = '';
            $scope.mediaCropped = '';
            $scope.view = 'home';
            $scope.files = [];
            $scope.queryModel = {
              busy: false,
              error: false
            };

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

            $scope.query = function() {
              var defer = $q.defer();
              $scope.queryModel.busy = true;
              fileSvc.find({skip: $scope.files.length, take: $scope.queryTake})
                .then(function(res) {
                  $scope.queryModel.busy = false;
                  defer.resolve(res.data.files);
                  angular.forEach(res.data.files, function(file) {
                    $scope.files.push(file);
                  });
                  $scope.queryModel.error = false;
                  defer.resolve(res);
                }, function(res) {
                  $scope.queryModel.busy = true;
                  $scope.queryModel.error = true;
                });

              return defer.promise;
            }
            $scope.viewList = function() {
              $scope.query()
                .then(function() {
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

            $scope.uploadCropped = function() {
              var url = piHttp.getBaseUrl() + '/filesystem',
                  fileType = fileUtils.typeFromBlog($scope.mediaUri),
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

              var blob = fileUtils.dataURLtoBlob($scope.mediaCropped),
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

(function(){
    var nutritionCard = function(ApiIsAuthorService, $rootScope)  {
        var link = function(scope, elem, attrs){
          if(_.isUndefined(scope.showSocial)) {
            showSocial = true;
          }

          if(_.isNumber(scope.article.datePublished)) {
            scope.article.datePublished = new Date(scope.article.datePublished * 1000);
          }
        }
        return {
          scope: {
              'article': '=',
              'showSocial': '='
          },
          replace: true,
          templateUrl: 'core/article/article-card.tpl.html',
          link: link
        }
    };
    nutritionCard.$inject = ['ApiIsAuthorService', '$rootScope'];
    angular
        .module('codigo.core.article')
        .directive('codigoArticleCard', nutritionCard);

})();

(function(){
    var SportsNewsCreateCtrl = function(articleSvc, $state, $rootScope){
        var self = this;
        this.model = {}; // the form model

        this.create = function(){
            var model = angular.copy(this.model);
            model.title = model.displayName;
            model.keywords = [];
            angular.forEach(this.model.keywords, function(v, k){
                model.keywords.push(v.text);
            });
            if(!_.isUndefined(self.categorySelect)) {
                model.categoryId = self.categorySelect.id;
            }
            articleSvc.post(model).then(function(res){
                $rootScope.categories.push(res.data.category);
                $state.go('article-list');
            });
        };
    };

    SportsNewsCreateCtrl.$inject = ['pi.core.article.articleSvc', '$state', '$rootScope'];

    angular
        .module('codigo')
        .controller('codigo.core.article.articleCreateCtrl', SportsNewsCreateCtrl);
})();
(function(){

  angular
      .module('codigo')
      .controller('codigo.core.article.articleListCtrl', ['pi.core.article.articleSvc', '$scope', '$stateParams',
      function(articleSvc, $scope, $stateParams){
          baseListCtrl.call(this, $scope, $stateParams);
          var self = this;

          this.getData = function() {
            return articleSvc.find(self.getQueryModel(['name', 'categoryId'])).then(function(r){
                //self.queryModel.busy = false;
                return r.data.articles || r.data;
            }, function(){
                //self.queryModel.busy = false;
            });
          }

      }]);
})();

(function(){
    var ctrl = function(articleSvc, $state, $stateParams){
        var self = this;
        this.model = {}; // the form model
        this.modelBusy = false;

        self.modelBusy = true;
        articleSvc.get($stateParams.id)
            .then(function(res){
                self.model = res.data.article;
                self.modelBusy = false;
            });

        this.save = function(){
            var model = angular.copy(this.model);
            model.title = model.displayName;
            if(!_.isUndefined(self.categorySelect)) {
                model.categoryId = self.categorySelect.id;
            }

            articleSvc.put($stateParams.id, model).then(function(res){
                $state.go('article-list');
            });
        };

        this.remove = function(){
            articleSvc.remove($stateParams.id).then(function(res){
                $state.go('article-list');
            });
        }
    };

    ctrl.$inject = ['pi.core.article.articleSvc', '$state', '$stateParams'];

    angular
        .module('codigo')
        .controller('codigo.core.article.articleSaveCtrl', ctrl);
})();
(function(){
    var SportsNewsViewCtrl = function(articleSvc, $scope, $stateParams, facebookMetaService) {
        this.id = $stateParams.id;
        var self = this;
        articleSvc.get($stateParams.id)
            .then(function(res){
                facebookMetaService.set(res.data.article.name, res.data.article.headline, res.data.article.image);
                self.sportsNews = res.data.article;
            });
    }
    SportsNewsViewCtrl.$inject = ['pi.core.article.articleSvc', '$scope', '$stateParams', 'facebookMetaService'];

    angular
        .module('codigo')
        .controller('codigo.core.article.articleViewCtrl', SportsNewsViewCtrl);
})();
(function(){
    angular
        .module('codigo.core.article')
        .controller('codigo.core.article.categoryCreateCtrl', ['pi.core.article.articleCategorySvc', '$state', function(categorySvc, $state){

            var self = this;
            this.model = {};

            this.create = function(){
                categorySvc.post(self.model)
                    .then(function(res){
                        $state.go('category-list');
                    });
            }
        }]);
})();
(function(){
    angular
        .module('codigo')
        .controller('codigo.core.article.categoryListCtrl', ['pi.core.article.articleCategorySvc', function(articleCategorySvc){
            var self = this;

            articleCategorySvc.find({})
                .then(function(res){
                    self.categories = res.data.categories;
                })
        }])
})();
(function(){
    angular
        .module('codigo.core.article')
        .controller('codigo.core.article.categorySaveCtrl', ['pi.core.article.articleCategorySvc', '$state', '$stateParams', function(categorySvc, $state, $stateParams){

            var self = this;
            this.model = {};
            categorySvc.get($stateParams.id)
                .then(function(res){
                    self.model = res.data.category;
                });

            this.remove = function(){
                categorySvc.remove($stateParams.id, self.model)
                    .then(function(res){
                        $state.go('category-list');
                    });
            }
            this.save = function(){
                categorySvc.put($stateParams.id, self.model)
                    .then(function(res){
                        $state.go('category-list');
                    });
            }
        }]);
})();
(function(){

    angular
        .module('codigo.core.question')
        .controller('codigo.core.question.questionCardCtrl', [function(){

        }])
        .directive('codigoQuestionCard', [function(){

            return {
                scope: {
                    'question': '='
                },
                replace: true,
                templateUrl: 'core/question/question-card.tpl.html',
                controller: 'codigo.core.question.questionCardCtrl'
            }
        }]);
})();
(function(){
    var ctrl = function(questionSvc, $scope, $stateParams){
        var self = this;

        this.questions = [];

        this.queryModel = {
            busy: false
        };

        $scope.$on('$destroy', function(){
            self.questions = undefined;
        });

        var getModelFromStateParams = function(names, model){

            angular.forEach(names, function(value){
                if(!_.isUndefined($stateParams[value])) {
                    model[value] = $stateParams[value];
                }
            });

            return model;
        }

        var getQueryModel = function(){
            var model = {skip: self.questions.length, take: 12};
            getModelFromStateParams(['name', 'categoryId'], model);
            return model;
        }

        this.query = function() {
            if(self.queryModel.busy) return;

            self.queryModel.busy = true;
            questionSvc.find(getQueryModel()).then(function(r){
                if(r.data.questions.length < 1) return;

                angular.forEach(r.data.questions, function(event){
                    self.questions.push(event);
                });

                self.queryModel.busy = false;
            }, function(){
                self.queryModel.busy = false;
            });
        };

    };

    ctrl.$inject = ['pi.core.question.questionSvc', '$scope', '$stateParams'];

    angular
        .module('codigo')
        .controller('codigo.core.question.questionListCtrl', ctrl);
})();
(function(){
    var SportsNewsViewCtrl = function(questionSvc, $scope, $stateParams) {
        this.id = $stateParams.id;
        var self = this;
        questionSvc.get($stateParams.id)
            .then(function(res){
                self.question = res.data.question;
            });
    }
    SportsNewsViewCtrl.$inject = ['pi.core.question.questionSvc', '$scope', '$stateParams'];

    angular
        .module('codigo')
        .controller('codigo.core.question.questionViewCtrl', SportsNewsViewCtrl);
})();