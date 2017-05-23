app.controller('home.controller', [
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

    console.log("Home");

    var base = angular.element("#home");

    var places = [
        {
            code: "pe",
            ref : "div[data-ref=pe]",
            bgcolor : "#ffffff",
            color : "#5e5e5e",
            acolor : "#7f2685",
            x: "0px",
            y: "0px",
            position : 'rotate3d(0.81, 0.42, 0, 9.18deg)'
        },
        {
            code: "di",
            ref : "div[data-ref=di]",
            bgcolor : "#18d9dd",
            color : "#5e5e5e",
            acolor : "#e37478",
            x: "0px",
            y: "530px",
            position : 'rotate3d(-0.69, 0.42, 0, 8.11deg)'
        },
        {
            code: "go",
            ref : "div[data-ref=go]",
            bgcolor : "#ff8716",
            color : "#ffffff",
            acolor : "#ffffff",
            x: "580px",
            y: "530px",
            position : 'rotate3d(-0.70, -0.39, 0, 8.05deg)'
        }
    ];

    var gridWidth = 580;
    var gridHeight = 530;
    Draggable.create(".cursor", {
        type:"x,y",
        edgeResistance:1,
        bounds:".main",
        liveSnap:true,
        snap: {
            x: function(endValue) {
                return Math.round(endValue / gridWidth) * gridWidth;
            },
            y: function(endValue) {
                return Math.round(endValue / gridHeight) * gridHeight;
            }
        }
    });
    
    var i=1;
    var recursive = false;
    
    setInterval(function(){

        if (i > 0) {

            if (i === places.length || recursive === true) {
                i--;

                if (i === 1) {
                    recursive = false;
                    i = 1;
                } else {
                    recursive = true;
                }
            } else {
                i++;
            }
        }
        
        TweenLite.to(".dashed", 1, {
            transform: places[i-1].position,
            ease: Power2.easeOut
        });

        TweenLite.to(".main, .banner", 1, {
            opacity: 0,
            ease: Power2.easeOut
        });
        
        TweenLite.to(places[i-1].ref, 1, {
            opacity: 1,
            ease: Power2.easeOut
        });
        
        TweenLite.to("div[data-page=home]", 1, {
            backgroundColor: places[i-1].bgcolor,
            ease: Power2.easeOut
        });
        
        TweenLite.to("div[data-page=home] .cursor", 0.3, {
            left: places[i-1].x,
            bottom: places[i-1].y,
            ease: Power2.easeOut
        });
        
        $('div[data-page=home]').attr("data-content", places[i-1].code);
    }, 3500);
    
    
    var request = null;
    var mouse = {
      x: 0,
      y: 0
    };
    
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    
    
    $('body').mousemove(function(event) {

      mouse.x = event.pageX;
      mouse.y = event.pageY;

      cancelAnimationFrame(request);
      request = requestAnimationFrame(update);
    });

    function update() {

      var dx = mouse.x - cx;
      var dy = mouse.y - cy;

      var tiltx = (dy / cy);
      var tilty = -(dx / cx);
      var radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
      var degree = (radius * 8);
     
      TweenLite.to(".timeline", 1, {
        transform: 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
        ease: Power2.easeOut
      });
    }

    $(window).resize(function() {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    });

}]);
