angular.module('zenbrisa.controllers')
.controller('homepage',['$scope','$location','NgMap','appServices', function($scope,$location,NgMap, appServices){
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
		//console.log(searchData)
		$location.path('/search').search(searchData)
	}

	$scope.zn_SearchedResults = function(){
		navigator.geolocation.getCurrentPosition(function(position, html5Error) {
		     //geo_loc = processGeolocationResult(position);
		     //currLatLong = geo_loc.split(",");
		     console.log(position.coords.latitude.toFixed(8))
		     console.log(position.coords.longitude.toFixed(8))
		     //initializeCurrent(currLatLong[0], currLatLong[1]);
		});
		/*Search Results*/
		var obj = $location.search();
		obj.limit = 20;
		obj.offset = 0;
		appServices.post(API_URL.search, obj, function(response){
			if(response.status == 1){
				$scope.znUsers = response.data;
				$scope.paging = {
			        total: response.total,
			        pages : Math.ceil((response.total)/obj.limit),
			        limit : obj.limit,
			        start : (obj.offset*obj.limit)+1,
			        end : ((obj.offset+1)*obj.limit),
			        offset : obj.offset,
			        current: 1,
			        steps : 5,
			        onPageChanged: loadPages,
			    };
			    //console.log($scope.paging)
			}
		})
		$scope.searchData = $location.search();
	}


    
    function loadPages() {
    	//console.log("page changed")
        //console.log('Current page is : ' + $scope.paging.current);
		$scope.paging['start'] = ((($scope.paging.current-1)*$scope.paging.limit)+1);
        $scope.paging['end'] = ($scope.paging['total'] < ($scope.paging.current*$scope.paging.limit)) ? $scope.paging['total'] : ($scope.paging.current*$scope.paging.limit);
        // TODO : Load current page Data here
        $scope.paging['page'] = $scope.paging.current;
        //if($scope.paging.current != 1){
	        /*Search Results*/
	        //console.log(obj)
			var obj = $location.search();
			//console.log(obj)
			obj.offset = (($scope.paging.current-1)*$scope.paging.limit);
			appServices.post(API_URL.search, obj, function(response){
				if(response.status == 1){
					$scope.znUsers = response.data;
					$('body, html').animate({
				       scrollTop:0
				    },900);
				    //console.log($scope.paging)
				}
			})
		//}
		$scope.searchData = $location.search();
    }

    $scope.updateSearch = function(searchData){
    	/*Update Search Criteria*/
    	console.log(searchData)
    	var obj = $location.search();
    	var result={};
    	if(typeof obj != undefined && obj != null){
			Object.keys(obj).forEach((key) => result[key] = obj[key]);
		}
		if(typeof searchData != undefined && searchData != null){
			Object.keys(searchData).forEach((key) => result[key] = searchData[key]);
		}

		/*Delete Unwanted Keys*/
		delete result.limit;
		delete result.offset;

		$location.search(result);
    }


}])
