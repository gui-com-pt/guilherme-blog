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