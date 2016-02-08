(function(){
    var ctrl = function(eventSvc, $state, $rootScope){
        var self = this;
        this.model = {}; // the form model

        this.create = function(){
            var model = angular.copy(this.model);
            model.tags = [];
            angular.forEach(this.model.tags, function(v, k){
                model.tags.push(v.text);
            });

            if(!_.isUndefined(self.categorySelect)) {
                model.categoryId = self.categorySelect.id;
            }

            if(!_.isUndefined(self.stateSelect)) {
                model.state = self.stateSelect.id;
            }

            if(!_.isUndefined(self.refferSelect)) {
                model.refferName = self.refferSelect.name;
                model.refferUrl = self.refferSelect.url;
                model.refferImage = self.refferSelect.image;
            }

            eventSvc.post(model).then(function(res){
                $state.go('admin-event-list');
            });
        };
    };

    ctrl.$inject = ['pi.core.app.eventSvc', '$state', '$rootScope'];

    angular
        .module('codigo.admin.core')
        .controller('admin.core.event.eventCreateCtrl', ctrl);
})();