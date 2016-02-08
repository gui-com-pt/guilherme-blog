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
                url: '/artigo-category/:id',
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
      .config(['facebookMetaServiceProvider', 'piHttpProvider', '$locationProvider', '$stateProvider', 'uiSelectConfig', '$provide', 'tagsInputConfigProvider', '$httpProvider', '$urlRouterProvider', 'googleAdsenseConfigProvider', function(facebookMetaServiceProvider, piHttpProvider, $locationProvider, $stateProvider, uiSelectConfig, $provide, tagsInputConfigProvider, $httpProvider, $urlRouterProvider, googleAdsenseConfigProvider){

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
