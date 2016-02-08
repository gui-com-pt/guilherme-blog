(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventSaveCategoryCtrl', ['pi.core.app.eventSvc', '$rootScope',
            function(eventSvc, $rootScope){
                var self = this;
                self.modelBusy = false;

                eventSvc.get($rootScope.$stateParams.id).then(function(res){
                    self.category = res.data.category;
                });

                this.save = function(tag){
                    var catId = self.categorySelect.id;

                    eventSvc.postCategory($rootScope.$stateParams.id, catId).then(function(res){
                        $rootScope.goPreviousState('admin-article-list');
                    });
                };
            }
        ]);
})();