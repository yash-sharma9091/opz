angular.module('zenbrisa.controllers')
.controller('homepage',['$scope','$location','NgMap','appServices','$rootScope', function($scope,$location,NgMap, appServices,$rootScope){
	/*Init Objects*/
	$scope.searchData = {}
    
    $scope.dynamicPopover = {
	    content: 'Hello, World!',
	    templateUrl: 'myPopoverTemplate.html',
	    title: 'Title dfgfdgdf'
	};


	/*Get Places from Google Map*/
	$scope.placeChanged = function() {
		$scope.place = this.getPlace();
		$scope.searchData['lat'] = JSON.parse(JSON.stringify($scope.place.geometry.location)).lat;
		$scope.searchData['lon'] = JSON.parse(JSON.stringify($scope.place.geometry.location)).lng;	
	}

	/*Get User Requested Data*/
	$scope.get_searched_results = function(searchData){
		
		if(typeof searchData.search_by != undefined && searchData.search_by != null && searchData.search_by != ''){
			var search_by = searchData.search_by;
			if(search_by == 'free_exchange'){
				searchData['free_exchange'] = 1
			}

			if(search_by == 'paid_exchange'){
				searchData['paid_exchange'] = 1
			}

			if(search_by == 'both'){
				searchData['both_exchange'] = 1
			}
		}

		var address = searchData.address;
		if(typeof address != undefined && address != null && address != ''){
			var components = address.split(', ');
		}
		
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
		delete searchData['lat'];
		delete searchData['lon'];
		delete searchData['search_by'];
		//console.log(searchData)
		$location.path('/search').search(searchData)
	}

	$scope.zn_SearchedResults = function(){
		/*navigator.geolocation.getCurrentPosition(function(position, html5Error) {
		     //geo_loc = processGeolocationResult(position);
		     //currLatLong = geo_loc.split(",");
		     console.log(position.coords.latitude.toFixed(8))
		     console.log(position.coords.longitude.toFixed(8))
		     //initializeCurrent(currLatLong[0], currLatLong[1]);
		});*/
		/*Search Results*/
		$scope.loading = true;
		var obj = $location.search();
		obj.limit = 50;
		obj.offset = 0;
		appServices.post(API_URL.search, obj, function(response){
			if(response.status == 1){
				$scope.znUsers = response.data;
				$scope.paging = {
			        total: response.total,
			        pages : Math.ceil((response.total)/obj.limit),
			        limit : obj.limit,
			        start : (obj.offset*obj.limit)+1,
			        end : (response.total < ((obj.offset+1)*obj.limit)) ? response.total : ((obj.offset+1)*obj.limit),
			        offset : obj.offset,
			        current: 1,
			        steps : 5,
			        onPageChanged: loadPages,
			    };
			}
			$scope.loading = false;
		})
		var v = $location.search();
		$scope.searchData = $location.search();

		$scope.searchData = {
			free_exchange : (typeof v.free_exchange != undefined && v.free_exchange != null && v.free_exchange != '') ? 1 : '',
			both_exchange : (typeof v.both_exchange != undefined && v.both_exchange != null && v.both_exchange != '') ? 1 : '',
			paid_exchange : (typeof v.paid_exchange != undefined && v.paid_exchange != null && v.paid_exchange != '') ? 1 : '',
			sensual : (typeof v.sensual != undefined && v.sensual != null && v.sensual != '') ? 1 : '',
			therapeutic : (typeof v.therapeutic != undefined && v.therapeutic != null && v.therapeutic != '') ? 1 : '',
			both_service : (typeof v.both_service != undefined && v.both_service != null && v.both_service != '') ? 1 : '',
			lat : (typeof v.lat != undefined && v.lat != null) ? (v.lat) : '',
			lon : (typeof v.lon != undefined && v.lon != null) ? (v.lon) : '',
			min : (typeof v.min != undefined && v.min != null) ? (v.min) : '',
			max : (typeof v.max != undefined && v.max != null) ? (v.max) : '',
			country : (typeof v.country != undefined && v.country != null && v.country != '') ? (v.country) : '',
			state : (typeof v.state != undefined && v.state != null) ? (v.state) : '',
			city : (typeof v.city != undefined && v.city != null) ? (v.city) : '',
			seeking_male : (typeof v.seeking_male != undefined && v.seeking_male != null && v.seeking_male != '') ? 1 : '',
			seeking_female : (typeof v.seeking_female != undefined && v.seeking_female != null && v.seeking_female != '') ? 1 : '',
			seeking_both : (typeof v.seeking_both != undefined && v.seeking_both != null && v.seeking_both != '') ? 1 : '',
		}
		
		if(typeof v.level != undefined && v.level != null){
			var level = v.level.split("|");
			var l = {};
			if(level.length > 0){
				level.forEach(function(lvl, key){
					l[key] = lvl
				})

				$scope.searchData.level = l
			}

		}

		if(typeof v.bodytype != undefined && v.bodytype != null){
			var bodytype = v.bodytype.split("|");
			var b = {};
			if(bodytype.length > 0){
				bodytype.forEach(function(bdy, key){
					b[key] = bdy
				})

				$scope.searchData.bodytype = b
			}

		}

	}

    
    function loadPages() {
		$scope.paging['start'] = ((($scope.paging.current-1)*$scope.paging.limit)+1);
        $scope.paging['end'] = ($scope.paging['total'] < ($scope.paging.current*$scope.paging.limit)) ? $scope.paging['total'] : ($scope.paging.current*$scope.paging.limit);
        // TODO : Load current page Data here
        $scope.paging['page'] = $scope.paging.current;
	        /*Search Results*/
			var obj = $location.search();
			obj.offset = (($scope.paging.current-1)*$scope.paging.limit);
			appServices.post(API_URL.search, obj, function(response){
				if(response.status == 1){
					$scope.znUsers = response.data;
					$('body, html').animate({
				       scrollTop:0
				    },900);
				}
			})
		var v = $location.search();
		$scope.searchData = {
			free_exchange : (typeof v.free_exchange != undefined && v.free_exchange != null && v.free_exchange != '') ? 1 : '',
			both_exchange : (typeof v.both_exchange != undefined && v.both_exchange != null && v.both_exchange != '') ? 1 : '',
			paid_exchange : (typeof v.paid_exchange != undefined && v.paid_exchange != null && v.paid_exchange != '') ? 1 : '',
			sensual : (typeof v.sensual != undefined && v.sensual != null && v.sensual != '') ? 1 : '',
			therapeutic : (typeof v.therapeutic != undefined && v.therapeutic != null && v.therapeutic != '') ? 1 : '',
			both_service : (typeof v.both_service != undefined && v.both_service != null && v.both_service != '') ? 1 : '',
			lat : (typeof v.lat != undefined && v.lat != null) ? (v.lat) : '',
			lon : (typeof v.lon != undefined && v.lon != null) ? (v.lon) : '',
			min : (typeof v.min != undefined && v.min != null) ? (v.min) : '',
			max : (typeof v.max != undefined && v.max != null) ? (v.max) : '',
			country : (typeof v.country != undefined && v.country != null && v.country != '') ? (v.country) : '',
			state : (typeof v.state != undefined && v.state != null) ? (v.state) : '',
			city : (typeof v.city != undefined && v.city != null) ? (v.city) : '',
			seeking_male : (typeof v.seeking_male != undefined && v.seeking_male != null && v.seeking_male != '') ? 1 : '',
			seeking_female : (typeof v.seeking_female != undefined && v.seeking_female != null && v.seeking_female != '') ? 1 : '',
			seeking_both : (typeof v.seeking_both != undefined && v.seeking_both != null && v.seeking_both != '') ? 1 : '',
		}

		if(typeof v.level != undefined && v.level != null){
			var level = v.level.split("|");
			var l = {};
			if(level.length > 0){
				level.forEach(function(lvl, key){
					l[key] = lvl
				})

				$scope.searchData.level = l
			}

		}

		if(typeof v.bodytype != undefined && v.bodytype != null){
			var bodytype = v.bodytype.split("|");
			var b = {};
			if(bodytype.length > 0){
				bodytype.forEach(function(bdy, key){
					b[key] = bdy
				})

				$scope.searchData.bodytype = b
			}

		}

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
		if(typeof result.level != undefined && result.level != null && Object.keys(result.level).length > 0){
			var l = [];
			Object.keys(result.level).forEach(function(key){
				l.push(result.level[key])
			})
			result['level'] = l.join("|")
		}

		if(typeof result.bodytype != undefined && result.bodytype != null && Object.keys(result.bodytype).length > 0){
			var b = [];
			Object.keys(result.bodytype).forEach(function(key){
				b.push(result.bodytype[key])
			})
			result['bodytype'] = b.join("|")
		}
		/*Delete Unwanted Keys*/
		delete result.limit;
		delete result.offset;
		$location.search(result);
    }

    /*$scope.setFields = function(){
    	var loc = [];
    	if($scope.searchData['city']){
    		loc.push($scope.searchData['city'])
    	}

    	if($scope.searchData['state']){
    		loc.push($scope.searchData['state'])
    	}

    	if($scope.searchData['country']){
    		loc.push($scope.searchData['country'])
    	}

    	//console.log($scope.searchData)
    	$scope.searchData = {
    		address : loc.join(", ")
    	}
    }*/
}])