app.controller('detail.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$http', function($scope, $location, $routeParams, $route, $http) {

    var base = angular.element("#list");

    //$scope.urlmain = window.location.pathname.substring(1, 3);
    $scope.urlmain = (((window.location.pathname).replace('release','')).replace(/([^:]\/)\/+/g, "$1")).substring(2, 4);
    
    //$scope.urlpath = window.location.pathname.substring(4, window.location.pathname.length);
    $scope.urlpath = (window.location.pathname.replace('release','')).substring(4, window.location.pathname.length);
    
    $scope.action = {

        scroll : function() {
            $('html, body').animate({ scrollTop: $(".content").offset().top}, 450);
        }
    };
    
    $('body').removeClass('full-height');
    
}]);

     