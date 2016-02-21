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

          $http.get('http://localhost/api/init').then(
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
      .module('codigo.admin', ['codigo', 'ui.router', 'pi.common']);

    angular
      .module('codigo.admin.core', ['codigo', 'codigo.admin']);

    angular
      .module('codigo.admin.core')
      .config(['$stateProvider', 
        function($stateProvider) {

          $stateProvider
            .state('admin-article-list', {
              url: '/admin/article-list',
              controller: 'admin.core.article.articleListCtrl',
              controllerAs: 'ctrl',
              templateUrl: 'admin/core/article/article-list.tpl.html'
            })
            .state('admin-article-state', {
                url: '/artigo-state/:id',
                templateUrl: 'admin/core/article/article-state.tpl.html',
                controller: 'admin.core.article.articleStateCtrl',
                controllerAs: 'ctrl'
            })
             .state('admin-article-category-save', {
                url: '/artigo-category-save/:id',
                templateUrl: 'admin/core/article/article-category-save.tpl.html',
                controller: 'admin.core.article.articleSaveCategoryCtrl',
                controllerAs: 'ctrl'
            })
            .state('admin-article-category', {
                url: '/admin-category/:id',
                templateUrl: 'admin/core/article/article-category.tpl.html',
                controller: 'admin.core.article.articleCategoryCtrl',
                controllerAs: 'ctrl'
            })
            .state('admin-article-create', {
                url: '/artigo-novo',
                templateUrl: 'admin/core/article/article-create.tpl.html',
                controller: 'admin.core.article.articleCreateCtrl',
                controllerAs: 'ctrl'
            })
            .state('admin-article-save', {
                url: '/article-save/:id',
                templateUrl: 'admin/core/article/article-save.tpl.html',
                controller: 'admin.core.article.articleSaveCtrl',
                controllerAs: 'ctrl'
            });

        }])
      .directive('adminAuthor', [function(){
        return {
          link: function(scope, elem, attrs) {

          },
          scope: {
            'entity': '@'
          },
          template: '<a class="admin-author"><img class="admin-author__avatar" src="http://gravatar.com/avatar/e53ef2b311753a8e087dfa4994125022?s=512" /><span class="author__name" ng-bind="author.displayName"></span></a>'
        }
      }])
      .directive('articleStateBadge', [function(){
        return {
          link: function(scope, elem, attrs, ngModel) {
            scope.$watch(function() {
              return ngModel.$modelValue;
            }, function(newValue) {
              if(!_.isNumber(newValue)) {
                scope.displayText = 'N/A';
                return;
              }

              switch(newValue)
              {
                case 1:
                  scope.displayText = 'Draft';
                  break;
                case 2:
                  scope.displayText = 'Published';
                  break;
                case 3:
                  scope.displayText = 'Censored';
                  break;
              }
            })
          },
          require: '^ngModel',
          template: '<span class="badge badge-state">{{displayText}}</span>'
        }
      }]);

    angular
        .module('codigo.core', ['codigo']);

    angular
        .module('codigo.core.article', ['codigo.core']);

    angular
        .module('codigo.core.question', ['codigo.core']);

  angular
    .module('codigo', ['codigo.admin.core', 'codigo.admin', 'templates', 'pi.core', 'pi.core.app', 'pi.core.question', 'pi.core.payment', 'pi.core.chat', 'pi.core.likes', 'pi.core.product', 'codigo.core', 'codigo.core.article', 'codigo.core.question',
  'pi.core.file','pi.googleAdsense', 'ngImgCrop', 'pi.common',
      'ui.router', 'ui.bootstrap.modal', 'textAngular', 'infinite-scroll', 'ngFileUpload', 'ui.select', 'angularMoment', 'pi',
      'piClassHover', 'ngTagsInput', '720kb.socialshare', 'wu.masonry', 'config', 'angular-bind-html-compile',
      'datetime']);

  angular
    .module('codigo')
      .config(['piProvider', 'facebookMetaServiceProvider', 'piHttpProvider', '$locationProvider', '$stateProvider', 'uiSelectConfig', '$provide', 'tagsInputConfigProvider', '$httpProvider', '$urlRouterProvider', 'googleAdsenseConfigProvider', function(piProvider, facebookMetaServiceProvider, piHttpProvider, $locationProvider, $stateProvider, uiSelectConfig, $provide, tagsInputConfigProvider, $httpProvider, $urlRouterProvider, googleAdsenseConfigProvider){

        piProvider.setAppId("56bacb095f27dda90aa1bf86");
        googleAdsenseConfigProvider.setClient('ca-pub-1750926490246398');
        googleAdsenseConfigProvider.setSlot('5417208575');

        $urlRouterProvider.otherwise('/');

        piHttpProvider.setBaseUrl('http://localhost/api');

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
              .state('article-view', {
                  url: '/blog/:categories/:name--:id',
                  templateUrl: 'core/article/article-view.tpl.html',
                  controller: 'codigo.core.article.articleViewCtrl',
                  controllerAs: 'ctrl'
              });

      }])
    .run(['$rootScope', 'pi.core.app.eventCategorySvc', 'pi.core.article.articleCategorySvc', '$state', '$stateParams', 'codigoModel', '$window', '$location',
      function($rootScope, eventCategorySvc, categorySvc, $state, $stateParams, codigoModel, $window, $location){

        $rootScope.$location = $location;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        
        $rootScope.goPreviousState = function(defaultState) {
            if(_.isEmpty($rootScope.previousState_name) && _.isString(defaultState)) {
              $state.go(defaultState);
            } else {
              $state.go($rootScope.previousState_name,$rootScope.previousState_params);
            }
        };

        $rootScope.articleStates = [
          {
            id: 1,
            name: 'Draft'
          },
          {
            id: 2,
            name: 'Published'
          },
          {
            id: 3,
            name: 'Censored'
          },
          {
            id: 99,
            name: 'Removed'
          }
        ];

        $rootScope.eventStates = [
          {
            id: 1,
            name: 'Draft'
          },
          {
            id: 2,
            name: 'Published'
          },
          {
            id: 3,
            name: 'Censored'
          },
          {
            id: 99,
            name: 'Removed'
          }
        ];

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
            $rootScope.articleCategories = res.data.categories;
          });

        eventCategorySvc.find({take: 100})
          .then(function(res){
            $rootScope.eventCategories = res.data.categories;
          });
    }]);
})();


function baseListCtrl($scope, $stateParams) {
  var self = this;

  self.perPage = 12;
  self.results = [];

  self.queryModel = {
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

  angular
      .module('codigo')
      .controller('codigo.core.article.articleListCtrl', ['pi.core.article.articleSvc', '$scope', '$stateParams', '$piEventStateEnum',
      function(articleSvc, $scope, $stateParams, $piEventStateEnum){
          baseListCtrl.call(this, $scope, $stateParams);
          var self = this;

          this.getData = function() {
            var model = self.getQueryModel(['name', 'categoryId']);
            model.state = $piEventStateEnum.Published;
            return articleSvc.find(model).then(function(r){
                return r.data.articles || r.data;
            }, function(){
                
            });
          }

      }]);
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
(function(){
    var ctrl = function(appSvc, $state, $rootScope){
        var self = this;
        this.model = {}; // the form model

        this.create = function(){
            var model = angular.copy(this.model);
            
            appSvc.post(model).then(function(res){
                $state.go('admin-application-list');
            });
        };
    };

    ctrl.$inject = ['pi.core.app.appSvc', '$state', '$rootScope'];

    angular
        .module('codigo.admin.core')
        .controller('admin.core.application.applicationCreateCtrl', ctrl);
})();
(function(){

	angular
	  	.module('codigo.admin.core')
	  	.controller('admin.core.application.applicationCurrentCtrl', ['pi', 'pi.core.app.appSvc', '$scope', '$rootScope', 
	  		function(pi, appSvc, $scope, $rootScope){
	  			this.setCurrent = function(app) {
	  				$rootScope.currentApplication = app;
	  				pi.setAppId(app.id);
	  			}
	      	}
		]);
})();
(function(){

	angular
	  	.module('codigo.admin.core')
	  	.controller('admin.core.application.applicationListCtrl', ['pi.core.app.appSvc', '$scope', '$stateParams', 
	  		function(appSvc, $scope, $stateParams){
	  			baseListCtrl.call(this, $scope, $stateParams);
	          	var self = this;

	          	this.getData = function() {
	            	return appSvc.find(self.getQueryModel(['name', 'categoryId'])).then(function(r){
	               	 return r.data.applications || r.data;
	            	}, function(){

	            	});
	          	}
	      	}
		]);
})();
(function(){

	angular
		.module('codigo.admin.core')
		.run(['pi.core.app.appSvc', '$rootScope', 'pi',
			function(appSvc, $rootScope, pi) {
				appSvc.find().then(function(r){
						$rootScope.applications = r.data.applications;
						$rootScope.currentApplication = $rootScope.applications[0];
						pi.setAppId($rootScope.currentApplication.id);
	            	}, function(){
	            		$rootScope.applications = [];
	            	});
		}])
		.config(['$stateProvider', function($stateProvider){
			$stateProvider
				.state('application-current', {
					url: '/application-current',
					templateUrl: 'admin/core/application/application-current.tpl.html',
					controller: 'admin.core.application.applicationCurrentCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-application-list', {
					url: '/applications',
					templateUrl: 'admin/core/application/application-list.tpl.html',
					controller: 'admin.core.application.applicationListCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-application-save', {
					url: '/application/:id/edit',
					templateUrl: 'admin/core/application/application-save.tpl.html',
					controller: 'admin.core.application.applicationSaveCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-application-create',{
					url: '/application/create',
					templateUrl: 'admin/core/application/application-create.tpl.html',
					controller: 'admin.core.application.applicationCreateCtrl',
					controllerAs: 'ctrl'
				});
		}]);
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleSaveCategoryCtrl', ['pi.core.article.articleSvc', '$rootScope',
            function(articleSvc, $rootScope){
                var self = this;
                self.modelBusy = false;

                articleSvc.get($rootScope.$stateParams.id).then(function(res){
                    self.category = res.data.category;
                });

                this.save = function(tag){
                    var catId = self.categorySelect.id;

                    articleSvc.postCategory($rootScope.$stateParams.id, catId).then(function(res){
                        $rootScope.goPreviousState('admin-article-list');
                    });
                };
            }
        ]);
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleCategoryCtrl', ['pi.core.article.articleCategorySvc', '$scope', '$stateParams',
            function(articleCategorySvc, $scope, $stateParams){

                baseListCtrl.call(this, $scope, $stateParams);
                var self = this;

                this.getData = function() {
                    var model = self.getQueryModel(['name', 'categoryId']);

                    return articleCategorySvc.find(model).then(function(r){
                            return r.data.categories || r.data;
                        }, function(){
                        });
                }
            }
        ]);
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleCreateCtrl', ['pi.core.article.articleSvc', '$state', '$rootScope',
            function(articleSvc, $state, $rootScope){
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

                    if(!_.isUndefined(self.stateSelect)) {
                        model.state = self.stateSelect.id;
                    }
                    
                    articleSvc.post(model).then(function(res){
                        $rootScope.categories.push(res.data.category);
                        $state.go('admin-article-list');
                    });
                };
            }
        ]);
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleKeywordCtrl', ['pi.core.article.articleSvc', '$state', '$stateParams',
            function(articleSvc, $state, $stateParams){
                var self = this;
                self.modelBusy = false;

                articleSvc.get($stateParams.id).then(function(res){
                    self.keywords = res.data.keywords;
                });

                this.save = function(tag){
                    articleSvc.postKeywords($stateParams.id, [tag]).then(function(res){
                        self.keywords = res.data.keywords;
                    });
                };

                this.remove = function(tag) {
                    articleSvc.removeKeywords($stateParams.id, [tag])
                        .then(function(res) {
                            for (var i = 0; i < self.keywords.length; i++) {
                                if(self.keywords[i] === tag) {
                                    self.keywords.splice(i, 1);
                                    break;
                                }
                            };
                        });
                }
            }
        ]);
})();
(function(){

  angular
      .module('codigo.admin.core')
      .controller('admin.core.article.articleListCtrl', ['pi.core.article.articleSvc', '$scope', '$stateParams',
      function(articleSvc, $scope, $stateParams){
          baseListCtrl.call(this, $scope, $stateParams);
          var self = this;

          this.getData = function() {
            var model = self.getQueryModel(['name', 'categoryId']);
            
            return articleSvc.find(model).then(function(r){
                return r.data.articles || r.data;
            }, function(){
            });
          }

      }]);
})();

(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleSaveCtrl', ['pi.core.article.articleSvc', '$state', '$stateParams',
            function(articleSvc, $state, $stateParams){
                var self = this;
                this.model = {}; // the form model
                this.modelBusy = false;

                self.modelBusy = true;
                articleSvc.get($stateParams.id)
                    .then(function(res){
                        self.model = res.data.article;
                        self.state = res.data.article.state;
                        self.modelBusy = false;
                    });

                this.save = function(){
                    var model = angular.copy(this.model);
                    model.title = model.displayName;
                    if(!_.isUndefined(self.categorySelect)) {
                        model.categoryId = self.categorySelect.id;
                    }

                    articleSvc.put($stateParams.id, model).then(function(res){
                        $state.go('admin-article-list');
                    });
                };

                this.remove = function(){
                    articleSvc.remove($stateParams.id).then(function(res){
                        $state.go('admin-article-list');
                    });
                }
            }
        ]);

})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleStateCtrl', ['pi.core.article.articleSvc', '$state', '$stateParams',
            function(articleSvc, $state, $stateParams){
                var self = this;
                self.modelBusy = false;

                this.save = function(){
                    articleSvc.postState($stateParams.id, self.stateSelected.id).then(function(res){
                        $state.go('admin-article-list');
                    });
                };
            }
        ]);
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.categoryCreateCtrl', ['pi.core.app.eventCategorySvc', '$state', function(categorySvc, $state){

            var self = this;
            this.model = {};

            this.create = function(){
                categorySvc.post(self.model)
                    .then(function(res){
                        $state.go('admin-event-category-list');
                    });
            }
        }]);
})();
(function(){
    angular
        .module('codigo')
        .controller('admin.core.event.categoryListCtrl', ['$scope', '$stateParams', 'pi.core.app.eventCategorySvc', 'facebookMetaService', 
        	function($scope, $stateParams, eventCategorySvc, facebookMetaService){
            	
            	
				baseListCtrl.call(this, $scope, $stateParams);
          		var self = this;

				this.getData = function() {
					return eventCategorySvc.find(self.getQueryModel(['name', 'categoryId'])).then(function(r){
					    return r.data.categories || r.data;
						}, function(){
						});
				}
        }])
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventSaveCategoryCtrl', ['pi.core.app.eventSvc', '$rootScope',
            function(eventSvc, $rootScope){
                var self = this;
                self.modelBusy = false;

                eventSvc.get($rootScope.$stateParams.id).then(function(res){
                    self.category = res.data.category;
                });

                this.save = function(tag){
                    var catId = self.categorySelect.id;

                    eventSvc.postCategory($rootScope.$stateParams.id, catId).then(function(res){
                        $rootScope.goPreviousState('admin-article-list');
                    });
                };
            }
        ]);
})();
(function(){
    var ctrl = function(eventSvc, $state, $rootScope){
        var self = this;
        this.model = {}; // the form model

        this.create = function(){
            var model = angular.copy(this.model);
            model.tags = [];
            angular.forEach(this.model.tags, function(v, k){
                model.tags.push(v.text);
            });

            if(!_.isUndefined(self.categorySelect)) {
                model.categoryId = self.categorySelect.id;
            }

            if(!_.isUndefined(self.stateSelect)) {
                model.state = self.stateSelect.id;
            }

            if(!_.isUndefined(self.refferSelect)) {
                model.refferName = self.refferSelect.name;
                model.refferUrl = self.refferSelect.url;
                model.refferImage = self.refferSelect.image;
            }

            eventSvc.post(model).then(function(res){
                $state.go('admin-event-list');
            });
        };
    };

    ctrl.$inject = ['pi.core.app.eventSvc', '$state', '$rootScope'];

    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventCreateCtrl', ctrl);
})();
(function(){

	angular
	  	.module('codigo.admin.core')
	  	.controller('admin.core.event.eventListCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', 
	  		function(eventSvc, $scope, $stateParams){
	  			baseListCtrl.call(this, $scope, $stateParams);
	          	var self = this;

	          	this.getData = function() {
	            	return eventSvc.find(self.getQueryModel(['name', 'categoryId'])).then(function(r){
	               	 return r.data.events || r.data;
	            	}, function(){

	            	});
	          	}
	      	}
		]);
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventSaveCtrl', ['pi.core.app.eventSvc', '$state', '$stateParams',
            function(eventSvc, $state, $stateParams){
                var self = this;
                this.model = {}; // the form model
                this.modelBusy = false;

                self.modelBusy = true;
                eventSvc.get($stateParams.id)
                    .then(function(res){
                        self.model = res.data.event;
                        self.model.doorTime = new Date(self.model.doorTime * 1000)
                        self.model.endDate = new Date(self.model.endDate * 1000);
                        self.state = res.data.event.state;
                        self.modelBusy = false;
                    });

                this.save = function(){
                    var model = angular.copy(this.model);
                    eventSvc.put($stateParams.id, model).then(function(res){
                        $state.go('admin-event-list');
                    });
                };

                this.remove = function(){
                    eventSvc.remove($stateParams.id).then(function(res){
                        $state.go('admin-event-list');
                    });
                }
            }
        ]);
})();
(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventStateCtrl', ['pi.core.app.eventSvc', '$state', '$stateParams',
            function(eventSvc, $state, $stateParams){
                var self = this;
                self.modelBusy = false;

                this.save = function(){
                    eventSvc.postState($stateParams.id, self.stateSelect.id).then(function(res){
                        $state.go('admin-event-list');
                    });
                };
            }
        ]);
})();
(function(){

	angular
		.module('codigo.admin.core')
		.config(['$stateProvider', function($stateProvider){
			$stateProvider
				.state('admin-event-category-create', {
					url: '/eventos-categoria-nova',
					templateUrl: 'admin/core/event/category-create.tpl.html',
					controller: 'admin.core.event.categoryCreateCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-category-change', {
					url: '/eventos-categoria-alterar/:id',
					templateUrl: 'admin/core/event/event-category-save.tpl.html',
					controller: 'admin.core.event.eventSaveCategoryCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-category-save', {
					url: '/eventos-categoria-editar/:id',
					templateUrl: 'admin/core/event/category-save.tpl.html',
					controller: 'admin.core.event.categorySaveCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-category-list',{
					url: '/eventos-categorias',
					templateUrl: 'admin/core/event/category-list.tpl.html',
					controller: 'admin.core.event.categoryListCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-list',{
					url: '/eventos',
					templateUrl: 'admin/core/event/event-list.tpl.html',
					controller: 'admin.core.event.eventListCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-view',{
					url: '/eventos/:id',
					templateUrl: 'admin/core/event/event-view.tpl.html',
					controller: 'admin.core.event.eventViewCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-save',{
					url: '/evento/:id/editar',
					templateUrl: 'admin/core/event/event-save.tpl.html',
					controller: 'admin.core.event.eventSaveCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-create',{
					url: '/evento/create',
					templateUrl: 'admin/core/event/event-create.tpl.html',
					controller: 'admin.core.event.eventCreateCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-state', {
					url: '/event/:id/state',
					templateUrl: 'admin/core/event/event-state.tpl.html',
					controller: 'admin.core.event.eventStateCtrl',
					controllerAs: 'ctrl'
				});
		}]);
})();