(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.categoryCreateCtrl', ['pi.core.app.eventCategorySvc', '$state', function(categorySvc, $state){

            var self = this;
            this.model = {};

            this.create = function(){
                categorySvc.post(self.model)
                    .then(function(res){
                        $state.go('admin-event-category-list');
                    });
            }
        }]);
})();