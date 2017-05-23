var app = angular.module('sebermorais', [
    'core.routes',
    'ui.bootstrap',
    'pathgather.popeye',
    'ngAnimate'
]);

var socket = {};

(function() {
    
    fetchData();

    function fetchData() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get("$http");

        return bootstrapApplication();
    }

    function bootstrapApplication() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ["sebermorais"]);
        });
    }

}());

app.config([
    '$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }
]);

app.run([
    '$rootScope',
    '$location',
    function ($rootScope, $location) {

        $rootScope.path = $location.path();
        $rootScope._ = _;

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.path = $location.path();
        });
    }
]);

window.app.Session = {};