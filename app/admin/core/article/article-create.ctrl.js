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