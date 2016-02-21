(function(){
    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventSaveCtrl', ['pi.core.app.eventSvc', '$state', '$stateParams',
            function(eventSvc, $state, $stateParams){
                var self = this;
                this.model = {}; // the form model
                this.modelBusy = false;

                self.modelBusy = true;
                eventSvc.get($stateParams.id)
                    .then(function(res){
                        self.model = res.data.event;
                        self.model.doorTime = new Date(self.model.doorTime * 1000)
                        self.model.endDate = new Date(self.model.endDate * 1000);
                        self.state = res.data.event.state;
                        self.modelBusy = false;
                    });

                this.save = function(){
                    var model = angular.copy(this.model);
                    eventSvc.put($stateParams.id, model).then(function(res){
                        $state.go('admin-event-list');
                    });
                };

                this.remove = function(){
                    eventSvc.remove($stateParams.id).then(function(res){
                        $state.go('admin-event-list');
                    });
                }
            }
        ]);
})();