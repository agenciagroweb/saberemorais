app.controller('about.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$http', function($scope, $location, $routeParams, $route, $http) {

    var base = angular.element("#about");

    $scope.urlmain = "pe";

    $('body').removeClass('full-height');

}]);