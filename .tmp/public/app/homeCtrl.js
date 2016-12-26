angular.module('zenbrisa',[])
.controller("home", ["$scope","$log",function($scope,$log){
$log.info("home controller is reday to work");

//angular code here

 $scope.minRangeSlider = {
        minValue: 10,
        maxValue: 90,
        options: {
            floor: 0,
            ceil: 100,
            step: 1
        }
    };
    $(".profHd").click(function(){
    	$(".profileNav").slideToggle()
    });

}]);
