angular.module('zenbrisa.controllers')
.controller('homepage',['$scope','$location','NgMap', function($scope,$location,NgMap){
	/*Init Objects*/
	$scope.searchData = {}

	/*Get Places from Google Map*/
	$scope.placeChanged = function() {
	$scope.place = this.getPlace();
		$scope.searchData['lat'] = JSON.parse(JSON.stringify($scope.place.geometry.location)).lat;
		$scope.searchData['lon'] = JSON.parse(JSON.stringify($scope.place.geometry.location)).lng;
		
	}

	/*Get User Requested Data*/
	$scope.get_searched_results = function(searchData){
		var address = searchData.address;
		var components = address.split(', ');
		
		if(typeof components != undefined && components != null && components.length > 0){
			var length = components.length;
			if(typeof components[length-1] != undefined && components[length-1] != null && components[length-1] != ''){
				searchData['country'] = components[length-1]	
			}

			if(typeof components[length-2] != undefined && components[length-2] != null && components[length-2] != ''){
				searchData['state'] = components[length-2]	
			}

			if(typeof components[length-3] != undefined && components[length-3] != null && components[length-3] != ''){
				searchData['city'] = components[length-3]	
			}
		}
		
		delete searchData['address'];
		console.log(searchData)
		$location.path('/search').search(searchData)
	}
}])
