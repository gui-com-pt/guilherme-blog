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
