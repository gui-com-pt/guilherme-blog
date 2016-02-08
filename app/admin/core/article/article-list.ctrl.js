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
