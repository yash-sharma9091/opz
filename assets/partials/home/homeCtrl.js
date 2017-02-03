angular.module('zenbrisa.controllers')
.controller('homepage', ['$scope', '$location', 'NgMap', 'appServices', '$rootScope', '$mdDialog', function($scope, $location, NgMap, appServices, $rootScope, $mdDialog) {
	$rootScope.usersAddInfo = [];

	if ($rootScope.isUserLogin) {
		var data = {};
		appServices.post(API_URL.getblockUser, data, function(response)
		{
			var result = response.data;
			if (response.status == 1) {
				$rootScope.usersAddInfo['blocked'] = result;
			}
		});

		appServices.post(API_URL.getfavourite, data, function(response)
		{
			var result = response.result;
			if (response.status == 1) {
				$rootScope.usersAddInfo['fav'] = result;
			}
		});
	}

	/*Init Objects*/
	$scope.searchData = {};

	$scope.slider = {
		min: 18,
		max: 100,
		options: {
			floor: 18,
			ceil: 100,
			step: 1,
			minLimit: 18
		}
	};

  	// Bodytype defaults
  	$scope.bodytype = [];
  	$scope.bodyTypeItems = [
  		{ value: 'slim_petite', text: 'Slim or Petite' },
  		{ value: 'average',  text: 'Average' },
  		{ value: 'gym_fit', text: 'Gym Fit' },
  		{ value: 'muscular', text: 'Muscular' },
  		{ value: 'few_pounds_over_average', text: 'Few Pounds over Average' },
  		{ value: 'large', text: 'Large' }
  	];

  	// Seeking defaults
  	$scope.searchData.searchBy = 'free_exchange';
  	$scope.seeking = [];
  	$scope.seekingItems = [
  		{ value: 'free_exchange', text: 'Free Massage Exchange' },
  		{ value: 'paid_exchange', text: 'Paid Professional Massage' }
  	];

  	// Massage Style defauts
  	$scope.massageStyle = [];
  	$scope.massageStyleItems = [
  		{ value: 'therapeutic', text: 'Therapeutic' },
  		{ value: 'sensual', text: 'Sensual' }
  	];

  	// Gender defaults
  	$scope.gender = [];
  	$scope.genderItems = [
  		{ value: 'male', text: 'Male' },
  		{value: 'female', text: 'Female'}
  	];

  	// Level of experience defaults
  	$scope.level = [];
  	$scope.levelItems = [
  		{ value: 'professional', text: 'Professional' },
  		{ value: 'student', text: 'Student' },
  		{ value: 'aficionado', text: 'Aficionado' },
  		{ value: 'amateur', text: 'Amateur'}
  	];

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
  	};

  	/*Get User Requested Data*/
  	$scope.get_searched_results = function(searchData) {
  		delete searchData['free_exchange'];
	   	delete searchData['paid_exchange'];
	   	delete searchData['both_exchange'];
	  	if (typeof searchData.searchBy != undefined && searchData.searchBy != null && searchData.searchBy != '') {
	  		var searchBy = searchData.searchBy;
	  		if (searchBy == 'free_exchange') {
	  			searchData['free_exchange'] = 1
	  		}

	  		if (searchBy == 'paid_exchange') {
	  			searchData['paid_exchange'] = 1
	  		}

	  		if (searchBy == 'both') {
	  			searchData['both_exchange'] = 1
	  		}
	  	}

	  	var address = searchData.address;

	  	if (typeof address != undefined && address != null && address != '') {
	  		var components = address.split(', ');
	  	}

	   // Reset the country, state, city
	   delete searchData['country'];
	   delete searchData['state'];
	   delete searchData['city'];

	   if (typeof components != undefined && components != null && components.length > 0) {
		   	var length = components.length;
		   	if (typeof components[length - 1] != undefined && components[length - 1] != null && components[length - 1] != '') {
		   		searchData['country'] = components[length - 1];
		   	}

		   	if (typeof components[length - 2] != undefined && components[length - 2] != null && components[length - 2] != '') {
		   		searchData['state'] = components[length - 2]
		   	}

		   	if (typeof components[length - 3] != undefined && components[length - 3] != null && components[length - 3] != '') {
		   		searchData['city'] = components[length - 3]
		   	}
   		};
   		delete searchData['searchBy'];
   		delete searchData['lat'];
   		delete searchData['lon'];

   		$location.path('/search').search(searchData)
	};

	$scope.zn_SearchedResults = function() {
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
	    if ($rootScope.isUserLogin) {
	    	obj.user_id = $rootScope.isUserLogin.userId;
	    }
	    appServices.post(API_URL.search, {'request':obj}, function(response) {
	    	if (response.status == 1) {
	    		$scope.znUsers = response.data;
	    		console.log($scope.znUsers.length);
	    		$scope.paging = {
	    			total: response.total,
	    			pages: Math.ceil((response.total) / obj.limit),
	    			limit: obj.limit,
	    			start: (obj.offset * obj.limit) + 1,
	    			end: (response.total < ((obj.offset + 1) * obj.limit)) ? response.total : ((obj.offset + 1) * obj.limit),
	    			offset: obj.offset,
	    			current: 1,
	    			steps: 5,
	    			onPageChanged: loadPages,
	    		};
	    	}
	    	$scope.loading = false;
	    });
	    var v = $location.search();
	    $scope.searchData = $location.search();
	    //console.log($scope.searchData);
	    $scope.searchData = {
	    	free_exchange: (typeof v.free_exchange != undefined && v.free_exchange != null && v.free_exchange != '') ? 1 : '',
	    	both_exchange: (typeof v.both_exchange != undefined && v.both_exchange != null && v.both_exchange != '') ? 1 : '',
	    	paid_exchange: (typeof v.paid_exchange != undefined && v.paid_exchange != null && v.paid_exchange != '') ? 1 : '',
	    	sensual: (typeof v.sensual != undefined && v.sensual != null && v.sensual != '') ? 1 : '',
	    	therapeutic: (typeof v.therapeutic != undefined && v.therapeutic != null && v.therapeutic != '') ? 1 : '',
	    	both_service: (typeof v.both_service != undefined && v.both_service != null && v.both_service != '') ? 1 : '',
	    	lat: (typeof v.lat != undefined && v.lat != null) ? (v.lat) : '',
	    	lon: (typeof v.lon != undefined && v.lon != null) ? (v.lon) : '',
	    	min: (typeof v.min != undefined && v.min != null) ? parseInt(v.min) : '',
	    	max: (typeof v.max != undefined && v.max != null) ? parseInt(v.max) : '',
	    	country: (typeof v.country != undefined && v.country != null && v.country != '') ? (v.country) : '',
	    	state: (typeof v.state != undefined && v.state != null) ? (v.state) : '',
	    	city: (typeof v.city != undefined && v.city != null) ? (v.city) : '',
	    	seeking_male: (typeof v.seeking_male != undefined && v.seeking_male != null && v.seeking_male != '') ? 1 : '',
	    	seeking_female: (typeof v.seeking_female != undefined && v.seeking_female != null && v.seeking_female != '') ? 1 : '',
	    	seeking_both: (typeof v.seeking_both != undefined && v.seeking_both != null && v.seeking_both != '') ? 1 : '',
	    	address: (typeof v.address != undefined && v.address != null && v.address != '') ? v.address : '',
	    }

		// Code re-factored
		if (typeof v.bodytype != undefined && v.bodytype != null) {
			$scope.bodytype = v.bodytype.split("|");
		}
		if (typeof v.level != undefined && v.level != null) {
			$scope.level = v.level.split("|");
		}
		if (v.free_exchange) {
			$scope.seeking.push('free_exchange');
			$scope.searchData.searchBy = 'free_exchange';
		}
		if (v.paid_exchange) {
			$scope.seeking.push('paid_exchange');
			$scope.searchData.searchBy = 'paid_exchange';
		}
		if(v.both_exchange){
			$scope.seeking.push('free_exchange','paid_exchange');	
			$scope.searchData.searchBy = 'both';
		}
		if (v.therapeutic) {
			$scope.massageStyle.push('therapeutic');
		}
		if (v.sensual) {
			$scope.massageStyle.push('sensual');
		}
		if (v.male) {
			$scope.gender.push('male');
		}
		if (v.female) {
			$scope.gender.push('female');
		}
		if (v.min) {
			$scope.slider.min = parseInt(v.min);
		}
		if (v.max) {
			$scope.slider.max = parseInt(v.max);
		}
	}


function loadPages() {
	$scope.paging['start'] = ((($scope.paging.current - 1) * $scope.paging.limit) + 1);
	$scope.paging['end'] = ($scope.paging['total'] < ($scope.paging.current * $scope.paging.limit)) ? $scope.paging['total'] : ($scope.paging.current * $scope.paging.limit);
   // TODO : Load current page Data here
   $scope.paging['page'] = $scope.paging.current;
   /*Search Results*/
   var obj = $location.search();
   obj.offset = (($scope.paging.current - 1) * $scope.paging.limit);
   appServices.post(API_URL.search,{'request': obj}, function(response) {
   	if (response.status == 1) {
   		$scope.znUsers = response.data;
   		console.log($scope.znUsers.length);
   		$('body, html').animate({
   			scrollTop: 0
   		}, 900);
   	}
   })
   var v = $location.search();
   $scope.searchData = {
   	free_exchange: (typeof v.free_exchange != undefined && v.free_exchange != null && v.free_exchange != '') ? 1 : '',
   	both_exchange: (typeof v.both_exchange != undefined && v.both_exchange != null && v.both_exchange != '') ? 1 : '',
   	paid_exchange: (typeof v.paid_exchange != undefined && v.paid_exchange != null && v.paid_exchange != '') ? 1 : '',
   	sensual: (typeof v.sensual != undefined && v.sensual != null && v.sensual != '') ? 1 : '',
   	therapeutic: (typeof v.therapeutic != undefined && v.therapeutic != null && v.therapeutic != '') ? 1 : '',
   	both_service: (typeof v.both_service != undefined && v.both_service != null && v.both_service != '') ? 1 : '',
   	lat: (typeof v.lat != undefined && v.lat != null) ? (v.lat) : '',
   	lon: (typeof v.lon != undefined && v.lon != null) ? (v.lon) : '',
   	min: (typeof v.min != undefined && v.min != null) ? parseInt(v.min) : '',
   	max: (typeof v.max != undefined && v.max != null) ? parseInt(v.max) : '',
   	country: (typeof v.country != undefined && v.country != null && v.country != '') ? (v.country) : '',
   	state: (typeof v.state != undefined && v.state != null) ? (v.state) : '',
   	city: (typeof v.city != undefined && v.city != null) ? (v.city) : '',
   	seeking_male: (typeof v.seeking_male != undefined && v.seeking_male != null && v.seeking_male != '') ? 1 : '',
   	seeking_female: (typeof v.seeking_female != undefined && v.seeking_female != null && v.seeking_female != '') ? 1 : '',
   	seeking_both: (typeof v.seeking_both != undefined && v.seeking_both != null && v.seeking_both != '') ? 1 : '',
   	searchBy:  (typeof v.searchBy != undefined && v.searchBy != null && v.searchBy != '') ? v.searchBy : '',
   }

   // Code re-factored
   if (typeof v.bodytype != undefined && v.bodytype != null) {
   	$scope.bodytype = v.bodytype.split("|");
   } else {
   	$scope.bodytype = [];
   }
   if (typeof v.level != undefined && v.level != null) {
   	$scope.level = v.level.split("|");
   } else {
   	$scope.level = [];
   }
}

$scope.updateSearch = function(searchData) {

	/*Update Search Criteria*/
	var obj = $location.search();
	var result = {};
	if (obj.country) {
		result['country'] = obj.country;
	}
	if (obj.state) {
		result['state'] = obj.state;
	}
	if (obj.city) {
		result['city'] = obj.city;
	}
	if (obj.address) {
		result['address'] = obj.address;
	}

	if ($scope.slider.min) {
		result['min'] = parseInt($scope.slider.min);
	}
	if ($scope.slider.max) {
		result['max'] = parseInt($scope.slider.max);
	}
	if (searchData.lat) {
		result['lat'] = searchData.lat;
	}
	if (searchData.lon) {
		result['lon'] = searchData.lon;
	}
	if ($scope.seeking.length > 0) {
		if ($scope.seeking.length === 2) {
			result['both_exchange'] = 1;
		} else {
			result['both_exchange'] = '';
		}
		$scope.seeking.forEach(function(key) {
			result[key] = 1;
		});
	}

	if ($scope.massageStyle.length > 0) {
		if ($scope.massageStyle.length === 2) {
			result['both_service'] = 1;
		} else {
			result['both_service'] = '';
		}
		$scope.massageStyle.forEach(function(key) {
			result[key] = 1;
		});
	}

	if ($scope.gender.length > 0) {
		if ($scope.gender.length === 2) {
			result['gender_both'] = 1;
		} else {
			result['gender_both'] = '';
		}
		$scope.gender.forEach(function(key) {
			result[key] = 1;
		});
	}

   /*if(typeof obj != undefined && obj != null){
			Object.keys(obj).forEach((key) => result[key] = obj[key]);
		}
		if(typeof searchData != undefined && searchData != null){
			Object.keys(searchData).forEach((key) => result[key] = searchData[key]);
		}*/

		if ($scope.level.length > 0) {
			var b = [];
			$scope.level.forEach(function(key) {
				b.push(key);
			});
			result['level'] = b.join("|");
		} else {
			result['level'] = '';
		}

		if ($scope.bodytype.length > 0) {
			var b = [];
			$scope.bodytype.forEach(function(key) {
				b.push(key);
			});
			result['bodytype'] = b.join("|");
		} else {
			result['bodytype'] = '';
		}
		/*Delete Unwanted Keys*/
		delete result.limit;
		delete result.offset;
		$location.search(result);
	}

  // For body type checkboxes
  // source@ https://material.angularjs.org/latest/demo/checkbox
  $scope.toggle = function(item, list) {
  	var idx = list.indexOf(item);
  	if (idx > -1) {
  		list.splice(idx, 1);
  	} else {
  		list.push(item);
  	}
  };

  $scope.exists = function(item, list) {
  	return list.indexOf(item) > -1;
  };

  	$scope.isChecked = function(x, t) {
    	return x.length === t.length;
  	};

  	$scope.toggleAll = function(x, t) {
    	var l1= x.length, l2 = t.length;
    	if( l1 === l2 ){
    		x.splice(0, l1);
    	} else if(l1 === 0 || l1 > 0){
    		//First we need to empty array, because we are using push to fill in array
    		x.splice(0, l2); t.map(function(y){ x.push(y.value) }).slice(0);
    	}
  	};

  	$scope.isSelected = function (value) {

  		$scope.seeking.splice(0, $scope.seeking.length);
  		if(value === 'both') {
  			$scope.seekingItems.map(function (v) {
  				$scope.seeking.push(v.value);
  			}).slice(0);
  		} else {
  			$scope.seeking.push(value);
  		}
  	};

  	$scope.seekingChange = function (value) {
  		if($scope.seeking.length === 2){
  			$scope.searchData.searchBy = 'both';
  		} else if( $scope.seeking.length !== 0 ){
  			$scope.searchData.searchBy = $scope.seeking[0];
  		} else if( $scope.seeking.length === 0 ){
  			$scope.searchData.searchBy = '';
  		}
  	};

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

  //load blocked and Favorite list if user login on system 


  //check blocked user
  $scope.checkedBlocedUser = function(id, type) {
  	if (type == 'blocked') {
  		data = $rootScope.usersAddInfo.blocked;

  	}

  	if (type == 'fav') {
  		data = $rootScope.usersAddInfo.fav;
  	}

  	if (id) {
  		if (data) {
  			var flag = false;

  			angular.forEach(data, function(value) {
  				if (value.userId == id) {
  					flag = true;
  				}
  			});

  			if (flag == true) {
  				return true;
  			} else {
  				return false;
  			}

  		}

  	}
  };

  //set blocked un blocked user 
  $scope.setBlocked = function(id, index, data) {

  	var message;

  	var url, flag;
  	if (data[index].blocked == true) {
  		message = "Are you sure , you want to  unblocked this user";
  		url = API_URL.removeBlockuser;
  		flag = false;
  	} else {
  		message = "Are you sure , you want to blocked this user";

  		url = API_URL.blockuser;
  		flag = true;
  	}

  	var confirm = appServices.confirmAlert('Confirm?', message, 'default', 'Yes', 'No');


  	$mdDialog.show(confirm).then(function(response) {
  		data[index].isLodingBlock = true;
    //remove form server
    var user = {
    	'blockedUserId': id
    };
    appServices.post(url, user, function(response)

    {
    	if (response.status == 1) {

    		data[index].blocked = flag;


    		appServices.alert("Your request has been successfully accepted");



    	}
    	data[index].isLodingBlock = false;
    });

});
  }


  //set fav unfav user

  $scope.setFav = function(id, index, data, email) {

  	var message;
  	var user = {};

  	var url, flag;

  	if (data[index].favUser == true) {
  		message = "Are you sure , you want to make Unfavorite this user";
  		url = API_URL.removeTofav;
  		flag = false;
  		user = {
  			"favUserId": id
  		};
  	} else {
  		message = "Are you sure , you want to make Favorite this user";

  		url = API_URL.addTofav;
  		flag = true;
  		user = {
  			"favId": id,
  			"favEmail": email
  		};
  	}

  	var confirm = appServices.confirmAlert('Confirm?', message, 'default', 'Yes', 'No');


  	$mdDialog.show(confirm).then(function(response) {
  		data[index].isLodingFav = true;
    //remove form server

    appServices.post(url, user, function(response)

    {
    	if (response.status == 1) {

    		data[index].favUser = flag;


    		appServices.alert("Your request has been successfully accepted");



    	}
    	data[index].isLodingFav = false;
    });

});
  }

}]);