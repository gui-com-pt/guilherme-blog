(function(){

	angular
	  	.module('codigo.admin.core')
	  	.controller('admin.core.event.eventListCtrl', ['pi.core.app.eventSvc', '$scope', '$stateParams', 
	  		function(eventSvc, $scope, $stateParams){
	  			baseListCtrl.call(this, $scope, $stateParams);
	          	var self = this;

	          	this.getData = function() {
	            	return eventSvc.find(self.getQueryModel(['name', 'categoryId'])).then(function(r){
	               	 return r.data.events || r.data;
	            	}, function(){

	            	});
	          	}
	      	}
		]);
})();