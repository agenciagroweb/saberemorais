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

    $scope.urlmain = "pe";
    $scope.modal = {
        
        open : function(ref) {

            TweenLite.to(ref, 0.45, {
                css: {
                    display: "block",
                    scaleX: 1, 
                    scaleY: 1,
                    opacity: 1,
                },
                force3D:true,
                ease: Power2.easeOut
            });
        },
        
        close : function(ref) {

            TweenLite.to(ref, 0.45, {
                css: {
                    display: "none",
                    scaleX: 0, 
                    scaleY: 0,
                    opacity: 0
                },
                force3D:true,
                ease: Power2.easeOut
            });
        }
    };
    
    var places = [
        {
            code: "pe",
            ref : "div[data-ref=pe]",
            bgcolor : "#ffffff",
            color : "#5e5e5e",
            acolor : "#7f2685",
            x: "0px",
            y: "0px",
            position : 'rotate3d(0.76, 0.40, 0, 9.18deg)'
        },
        {
            code: "di",
            ref : "div[data-ref=di]",
            bgcolor : "#18d9dd",
            color : "#5e5e5e",
            acolor : "#e37478",
            x: "0px",
            y: "530px",
            position : 'rotate3d(-0.67, 0.40, 0, 8.11deg)'
        },
        {
            code: "go",
            ref : "div[data-ref=go]",
            bgcolor : "#ff8716",
            color : "#ffffff",
            acolor : "#ffffff",
            x: "580px",
            y: "530px",
            position : 'rotate3d(-0.67, -0.38, 0, 8.05deg)'
        }
    ];
    
    var animations = {
        
        start : function(i, cursor) {
                      
            TweenLite.to(".dashed", 1.6, {
                transform: places[i-1].position,
                ease: Power2.easeOut
            });

            TweenLite.to(".main, .banner", 0, {
                opacity: 0,
                display: "none",
                ease: Power2.easeOut
            });

            TweenLite.to((places[i-1].ref + ".main, " + places[i-1].ref + ".banner"), 2, {
                opacity: 1,
                display: "block",
                ease: Power2.easeOut
            });

            TweenLite.to("div[data-page=home]", 2, {
                backgroundColor: places[i-1].bgcolor,
                ease: Power2.easeOut
            });
            
            if (cursor === true) {
                
                TweenLite.to("div[data-page=home] .cursor", 0.5, {
                    left: places[i-1].x,
                    bottom: places[i-1].y,
                    ease: Power2.easeOut
                });
            }
            
            $('div[data-page=home]').attr("data-content", places[i-1].code);
            
            $scope.urlmain = places[i-1].code;
            $scope.$apply();
        },
        
        cursor : function (x, y) {
            
            TweenLite.to("div[data-page=home] .cursor", 0, {
                left: x,
                bottom: y
            });
        }
    };

    var gridWidth = 580;
    var gridHeight = 530;
//    var gridWidth = 10;
//    var gridHeight = 10;
    Draggable.create(".cursor", {
        type:"x,y",
        edgeResistance:1,
        bounds:".main",
        liveSnap:true,
        onDragEnd: function() {

            var y = Math.round($(".cursor").offset().top - $('.main').offset().top);
            var x = Math.round($(".cursor").offset().left - $('.main').offset().left);
            
            if (x >= (636 - (636 * 20/100)) && x <= (636 + (636 * 20/100))) {
                animations.start(3, false);
            }
            
            else if (x >= (464 - (464 * 20/100)) && x <= (464 + (464 * 20/100)) || x < 0) {
                animations.start(2, false);
            }
            
            else if (y >= (574 - (574 * 20/100)) && y <= (574 + (574 * 20/100))) {
                animations.start(1, false);
            }
            
            else {
                animations.start(1, false);
                animations.cursor('-576px', '0px');
            }
        },
        snap: {
            x: function(endValue) {
                return Math.round(endValue / gridWidth) * gridWidth;
            },
            y: function(endValue) {
                return Math.round(endValue / gridHeight) * gridHeight;
            }
        }
    });
    
    var time;
    var i=1;
    var recursive = false;
   
    time = setInterval(function(){

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
      
        animations.start(i, true);
                
    }, 5000);
    
    var request = null;
    var mouse = {
      x: 0,
      y: 0
    };
    
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    
    TweenLite.to(".dashed", 0, {
        transform: places[0].position,
        ease: Power2.easeOut
    });
        
//    $('body').mousemove(function(event) {
//
//      mouse.x = event.pageX;
//      mouse.y = event.pageY;
//
//      cancelAnimationFrame(request);
//      request = requestAnimationFrame(update);
//    });
//
//    function update() {
//
//      var dx = mouse.x - cx;
//      var dy = mouse.y - cy;
//
//      var tiltx = (dy / cy);
//      var tilty = -(dx / cx);
//      var radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
//      var degree = (radius * 8);
//     
//      TweenLite.to(".timeline", 1, {
//        transform: 'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
//        ease: Power2.easeOut
//      });
//    }

    $(window).resize(function() {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    });
    
    $(document).click(function() {
        clearInterval(time);
    });

    $(document).mouseup(function(e) 
    {
        var container = $(".details");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) 
        {
            $scope.modal.close('.details');
        }
    });

}]);