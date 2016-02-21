(function(){

	angular
	  	.module('codigo.admin.core')
	  	.controller('admin.core.application.applicationCurrentCtrl', ['pi', 'pi.core.app.appSvc', '$scope', '$rootScope', 
	  		function(pi, appSvc, $scope, $rootScope){
	  			this.setCurrent = function(app) {
	  				$rootScope.currentApplication = app;
	  				pi.setAppId(app.id);
	  			}
	      	}
		]);
})();