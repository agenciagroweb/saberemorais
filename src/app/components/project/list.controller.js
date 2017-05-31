app.controller('list.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$timeout',
    '$filter',
    '$window',
    '$http',
    '$httpParamSerializer',
    'Popeye', function($scope, $location, $routeParams, $route, $timeout, $filter, $window, $http, $httpParamSerializer, Popeye) {

    console.log("list");

    var base = angular.element("#list");

    $scope.urlmain = $routeParams.slug;

    $scope.action = {

        scroll : function() {
            $('html, body').animate({ scrollTop: $(".content").offset().top - 45}, 450);
        }
    };
    
}]);