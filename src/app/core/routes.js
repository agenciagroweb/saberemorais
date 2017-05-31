angular.module('core.routes', ['ngRoute']).config([
    '$routeProvider',
    '$compileProvider',
    '$locationProvider', function($routeProvider, $compileProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider

        .when('/', {
            templateUrl : 'views/home/home.html',
            controller  : 'home.controller'
        })
        
        .when('/:slug/projetos/arquitetura', {
            templateUrl : 'views/project/list.html',
            controller  : 'list.controller'
        })
        
        .when('/:slug/projetos/comerciais', {
            templateUrl : 'views/project/list.html',
            controller  : 'list.controller'
        })
        
        .when('/:slug/projetos/interiores', {
            templateUrl : 'views/project/list.html',
            controller  : 'list.controller'
        })
        
        .when('/:slug/projetos/v/:slug', {
            templateUrl : 'views/project/list.html',
            controller  : 'list.controller'
        })

        .otherwise({ redirectTo: '/' });

}]);
