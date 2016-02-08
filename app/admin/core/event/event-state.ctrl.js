(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventStateCtrl', ['pi.core.app.eventSvc', '$state', '$stateParams',
            function(eventSvc, $state, $stateParams){
                var self = this;
                self.modelBusy = false;

                this.save = function(){
                    eventSvc.postState($stateParams.id, self.stateSelect.id).then(function(res){
                        $state.go('admin-event-list');
                    });
                };
            }
        ]);
})();