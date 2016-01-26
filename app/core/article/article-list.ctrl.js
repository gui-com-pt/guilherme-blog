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
