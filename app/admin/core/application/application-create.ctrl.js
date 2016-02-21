(function(){
    var ctrl = function(appSvc, $state, $rootScope){
        var self = this;
        this.model = {}; // the form model

        this.create = function(){
            var model = angular.copy(this.model);
            
            appSvc.post(model).then(function(res){
                $state.go('admin-application-list');
            });
        };
    };

    ctrl.$inject = ['pi.core.app.appSvc', '$state', '$rootScope'];

    angular
        .module('codigo.admin.core')
        .controller('admin.core.application.applicationCreateCtrl', ctrl);
})();