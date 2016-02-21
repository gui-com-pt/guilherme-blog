(function(){

	angular
		.module('codigo.admin.core')
		.run(['pi.core.app.appSvc', '$rootScope', 'pi',
			function(appSvc, $rootScope, pi) {
				appSvc.find().then(function(r){
						$rootScope.applications = r.data.applications;
						$rootScope.currentApplication = $rootScope.applications[0];
						pi.setAppId($rootScope.currentApplication.id);
	            	}, function(){
	            		$rootScope.applications = [];
	            	});
		}])
		.config(['$stateProvider', function($stateProvider){
			$stateProvider
				.state('application-current', {
					url: '/application-current',
					templateUrl: 'admin/core/application/application-current.tpl.html',
					controller: 'admin.core.application.applicationCurrentCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-application-list', {
					url: '/applications',
					templateUrl: 'admin/core/application/application-list.tpl.html',
					controller: 'admin.core.application.applicationListCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-application-save', {
					url: '/application/:id/edit',
					templateUrl: 'admin/core/application/application-save.tpl.html',
					controller: 'admin.core.application.applicationSaveCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-application-create',{
					url: '/application/create',
					templateUrl: 'admin/core/application/application-create.tpl.html',
					controller: 'admin.core.application.applicationCreateCtrl',
					controllerAs: 'ctrl'
				});
		}]);
})();