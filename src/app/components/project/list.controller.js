app.controller('list.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$http', function($scope, $location, $routeParams, $route, $http) {

    var base = angular.element("#list");

    $scope.urlmain = $routeParams.slug;

    //$scope.urlpath = window.location.pathname.substring(4, window.location.pathname.length);
    $scope.urlpath = (window.location.pathname.replace('release','')).substring(5, window.location.pathname.length);
    
    $scope.action = {

        scroll : function() {
            $('html, body').animate({ scrollTop: $(".content").offset().top - 45}, 450);
        }
    };
    
    $('body').removeClass('full-height');
    
}]);