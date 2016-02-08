(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleCategoryCtrl', ['pi.core.article.articleSvc', '$state', '$stateParams',
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
            }
        ]);
})();