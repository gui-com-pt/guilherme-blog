(function(){

	angular
		.module('codigo.admin.core')
		.config(['$stateProvider', function($stateProvider){
			$stateProvider
				.state('admin-event-category-create', {
					url: '/eventos-categoria-nova',
					templateUrl: 'admin/core/event/category-create.tpl.html',
					controller: 'admin.core.event.categoryCreateCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-category-change', {
					url: '/eventos-categoria-alterar/:id',
					templateUrl: 'admin/core/event/event-category-save.tpl.html',
					controller: 'admin.core.event.eventSaveCategoryCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-category-save', {
					url: '/eventos-categoria-editar/:id',
					templateUrl: 'admin/core/event/category-save.tpl.html',
					controller: 'admin.core.event.categorySaveCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-category-list',{
					url: '/eventos-categorias',
					templateUrl: 'admin/core/event/category-list.tpl.html',
					controller: 'admin.core.event.categoryListCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-list',{
					url: '/eventos',
					templateUrl: 'admin/core/event/event-list.tpl.html',
					controller: 'admin.core.event.eventListCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-view',{
					url: '/eventos/:id',
					templateUrl: 'admin/core/event/event-view.tpl.html',
					controller: 'admin.core.event.eventViewCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-save',{
					url: '/evento/:id/editar',
					templateUrl: 'admin/core/event/event-save.tpl.html',
					controller: 'admin.core.event.eventSaveCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-create',{
					url: '/evento/create',
					templateUrl: 'admin/core/event/event-create.tpl.html',
					controller: 'admin.core.event.eventCreateCtrl',
					controllerAs: 'ctrl'
				})
				.state('admin-event-state', {
					url: '/event/:id/state',
					templateUrl: 'admin/core/event/event-state.tpl.html',
					controller: 'admin.core.event.eventStateCtrl',
					controllerAs: 'ctrl'
				});
		}]);
})();