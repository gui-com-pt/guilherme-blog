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