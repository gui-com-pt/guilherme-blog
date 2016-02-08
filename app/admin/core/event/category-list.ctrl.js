(function(){
    angular
        .module('codigo')
        .controller('admin.core.event.categoryListCtrl', ['$scope', '$stateParams', 'pi.core.app.eventCategorySvc', 'facebookMetaService', 
        	function($scope, $stateParams, eventCategorySvc, facebookMetaService){
            	
            	
				baseListCtrl.call(this, $scope, $stateParams);
          		var self = this;

				this.getData = function() {
					return eventCategorySvc.find(self.getQueryModel(['name', 'categoryId'])).then(function(r){
					    return r.data.categories || r.data;
						}, function(){
						});
				}
        }])
})();