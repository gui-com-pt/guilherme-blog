(function(){

	angular
	  	.module('codigo.admin.core')
	  	.controller('admin.core.application.applicationListCtrl', ['pi.core.app.appSvc', '$scope', '$stateParams', 
	  		function(appSvc, $scope, $stateParams){
	  			baseListCtrl.call(this, $scope, $stateParams);
	          	var self = this;

	          	this.getData = function() {
	            	return appSvc.find(self.getQueryModel(['name', 'categoryId'])).then(function(r){
	               	 return r.data.applications || r.data;
	            	}, function(){

	            	});
	          	}
	      	}
		]);
})();