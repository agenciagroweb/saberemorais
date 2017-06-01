app.controller('contact.controller', [
    '$scope',
    '$location',
    '$routeParams',
    '$route',
    '$http', function($scope, $location, $routeParams, $route, $http) {

    var base = angular.element("#contact");
    
    $scope.urlmain = "pe";
    
    $(document).ready(function() {
        $('form:first *:input[type!=hidden]:first').focus();
    });
    
    $('body').removeClass('full-height');
    
}]);