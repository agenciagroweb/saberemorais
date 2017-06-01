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
            templateUrl : 'views/project/list-arquitetura.html',
            controller  : 'list.controller'
        })
        
        .when('/:slug/projetos/comerciais', {
            templateUrl : 'views/project/list-comercial.html',
            controller  : 'list.controller'
        })
        
        .when('/:slug/projetos/interiores', {
            templateUrl : 'views/project/list-interior.html',
            controller  : 'list.controller'
        })
        
        .when('/:slug/projetos/v/:slug', {
            templateUrl : 'views/project/detail/detail.html',
            controller  : 'detail.controller'
        })
        
        .when('/contato', {
            templateUrl : 'views/contact/contact.html',
            controller  : 'contact.controller'
        })
        
        .when('/sobre-nos', {
            templateUrl : 'views/about/about.html',
            controller  : 'about.controller'
        })

        .otherwise({ redirectTo: '/' });

}]);
