var app = angular.module( 'midas', [] );

app.controller( 'IndexController', ['$scope', '$interval', function( $scope, $interval ) {
    console.log( 'In IndexController' );

    $scope.slides = [
        { url : 'resources/app/images/banner/freshness-in-the-air.jpg' },
        { url : 'resources/app/images/banner/good-morning.jpg' },
        { url : 'resources/app/images/banner/morning-fresh.jpg' },

        { url : 'resources/app/images/banner/morning-shine.jpg' },
        { url : 'resources/app/images/banner/rain-nature.jpg' }
    ];

    $scope.configureSlides = function() {
        $scope.runningSlides = [];

        for( var i = 0 ; i < $scope.slides.length; i ++ ) {
            $scope.runningSlides.push( $scope.slides[i] );
        }

        $scope.runningSlides.splice( 0, 0, $scope.slides[ $scope.slides.length -1 ]);
        $scope.runningSlides.splice( $scope.runningSlides.length, 0, $scope.slides[ 0 ]);
    };

    $scope.configureSlides();
    $scope.activeSlide = 1;
    $scope.slideInProgress = false;

    $scope.next = function() {

        if( !$scope.slideInProgress ) {
            var ul = angular.element(document.querySelectorAll('.slides-container .slides ul'));
            $scope.activeSlide = ( $scope.activeSlide + 1 ) % $scope.runningSlides.length;

            Velocity(ul, {left: ( -1 * $scope.activeSlide * 100 ) + '%'}, {
                duration: 1000,
                easing: 'swing',
                complete: $scope.adjustCurrentSlide
            });

            $scope.slideInProgress = true;
        }

    };

    $scope.prev = function() {

        if( !$scope.slideInProgress ) {
            var ul = angular.element(document.querySelectorAll('.slides-container .slides ul'));
            $scope.activeSlide = ( $scope.activeSlide - 1 + $scope.runningSlides.length ) % $scope.runningSlides.length;

            Velocity(ul, {left: ( -1 * $scope.activeSlide * 100 ) + '%'}, {
                duration: 1000,
                easing: 'swing',
                complete: $scope.adjustCurrentSlide
            });

            $scope.slideInProgress = true;
        }

    };

    $scope.adjustCurrentSlide = function() {
        var ul = angular.element( document.querySelectorAll( '.slides-container .slides ul' ));
        if( $scope.activeSlide == ( $scope.runningSlides.length -1 )) {
            ul.css( 'left' , '-100%' );
            $scope.activeSlide = 1;
        }

        if( $scope.activeSlide == 0 ) {

            ul.css( 'left' , (-1 * ( $scope.runningSlides.length -2 ) * 100) + '%' );
            $scope.activeSlide = $scope.runningSlides.length -2 ;
        }

        $scope.slideInProgress = false;
    };

    $scope.jump = function( index ) {
        $scope.activeSlide = index;
        $scope.next();
    };

    $interval( function() {
        $scope.next();
    }, 4000 );
}]);