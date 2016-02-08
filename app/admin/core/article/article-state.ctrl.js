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