(function() {
    angular.module('wazzurb', ['ngRoute', 'kendo.directives', 'ngStorage']).config(moduleConfig);
    
    moduleConfig.$inject = ['$routeProvider'];
    
    function moduleConfig($routeProvider){
		$routeProvider.when('/', { 
			templateUrl: 'views/login.html',
            controller: 'loginController',
            controllerAs: 'login'
		})
    }
})(window);