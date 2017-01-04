angular.module('zenbrisa.controllers')
.controller('searchpage',['$scope','$location','NgMap', function($scope,$location,NgMap){
	/*Init Objects*/
	$scope.searchData = {}


	$scope.zn_SearchedResults = function(){
		/**/
		console.log($location.search())
		//$http.post("")
	}

}])
