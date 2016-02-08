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