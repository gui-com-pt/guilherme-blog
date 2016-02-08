(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.article.articleKeywordCtrl', ['pi.core.article.articleSvc', '$state', '$stateParams',
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

                this.remove = function(tag) {
                    articleSvc.removeKeywords($stateParams.id, [tag])
                        .then(function(res) {
                            for (var i = 0; i < self.keywords.length; i++) {
                                if(self.keywords[i] === tag) {
                                    self.keywords.splice(i, 1);
                                    break;
                                }
                            };
                        });
                }
            }
        ]);
})();