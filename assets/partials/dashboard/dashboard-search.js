angular.module('userDashboardSearchModule',[]).controller('userDashboardSearch', userDashboardSearch);

userDashboardSearch.$inject=['$scope', '$rootScope','appServices','$location','$filter'];

function userDashboardSearch(e, rootscope, appServices, $location, $filter)
{
	//load country ISO Code
	appServices.getCountryCode(function(response){
		e.countryCode=response;
	});

	e.commonMilesArray = appServices.milesList();
	e.commonCountryPhoneCodeArray = appServices.phoneCodeArray;
	e.searched = {
		mile : '',
		location : '',
		type: ''
	};
	e.mySavedLocations = function(){
		var data = {};
		appServices.post(API_URL.getTravelCities, data, function(response)
	     {
	     	/*Get Current User Saved Locations*/
	     	if(response.status == 1){
	     		/*If Response is not empty*/
	     		e.myLocations = response.data;
	     	}
		});
	}

	e.searchFromSavedLocations = function(searchData){
		if(typeof searchData.mile == undefined || searchData.mile == null || searchData.mile == ''){
			appServices.alert("Please Select Mile");
			return;			
		}
		/*Set Mile to Query String*/
		e.searchData = {
			mile : searchData.mile,
		}

		if(typeof searchData.location == undefined || searchData.location == null || searchData.location == ''){
			appServices.alert("Please Select Location");
			return;			
		}else{
			/*Set Lat/Lon to Query String*/
			var parts = searchData.location.split("|");

			if(e.searchData['mile'] == 'countrywide'){
				if(parts[3] == 'city'){
					appServices.alert("Please select a country as location Search");
					return;
				}
				e.searchData = {
					country : parts[0]
				}
				$location.path('/search').search(e.searchData)
			}

			e.searchData['lat'] = parts[1];
			e.searchData['lon'] = parts[2];
		}
		delete e.searchData['member'];
		delete e.searchData['q'];
		/*Search Results*/
		$location.path('/search').search(e.searchData)
	}

	e.searchMember = function(searchData){
		/*Find Data Using Member Tab*/
		if(typeof searchData.type == undefined || searchData.type == null || searchData.type == ''){
			appServices.alert("Please fill search criteria");
			return;
		}
		if(searchData.type == 'username' || searchData.type == 'keyword'){
			if(typeof searchData.q == undefined || searchData.q == null || searchData.q == ''){
				appServices.alert("Please fill search criteria");
				return;
			}
		}
		e.searchData = searchData;
		/*Delete Unwanted Search Query Strings*/
		delete e.searchData['mile'];
		delete e.searchData['location'];
		/*Search Results*/
		$location.path('/search').search(e.searchData)
	}

	e.checkLocationType = function(location){
		/*Check If searched location is City or Country*/
		if(typeof location != undefined && location != null && location !=''){
			var l = location.split("|");
			if(typeof l[3] != undefined && l[3] == 'country'){
				e.searched['mile'] = "countrywide";
			}
		}
	}

	e.asyncContacts = [];
	e.filterSelected = true;
	var data = rootscope.country;
	var countries = []
	for (k in data){
	    countries.push({
	    	title : data[k]
	    })
	 }
	e.countries = function(value){
		/*Filter countries for Dropdown Chips*/
	    return $filter('filter')(countries,{title : value});
	} 

	e.searchFromCountries = function(countries){
		/*Search data from multiple countries*/
		var c = []
		if(countries.length > 0){
			countries.map(function(country){
				c.push(country.title)
			})
		}
		if(c.length == 0){
			appServices.alert("Please Select at least One Country");
			return;
		}
		e.searchData = [];
		$location.path('/search').search({"countries":c.join("|")})
	}
	
	//addLocation
	e.addLocation= function(id,ev)
	{
		if(id==="addCity")
		{
		appServices.modal('partials/template/addLocation.html', addLocation, ev)
		}

		if(id==="addCountry")
		{
		appServices.modal('partials/template/addLocation.html', addLocation, ev)
		}

		if(id==='editList'){
			$location.path('/my-locations');
		}
	}
}




function addLocation($scope, $rootScope, appServices, $location,$mdDialog, $routeParams)
{
	$scope.cancel = function() 
	{
     $mdDialog.cancel();
 	};
 	//form submit

 	$scope.placeChanged = function() {
		$scope.place = this.getPlace();
		console.log($scope.place)
		var lat = JSON.parse(JSON.stringify($scope.place.geometry.location)).lat;
		var lon = JSON.parse(JSON.stringify($scope.place.geometry.location)).lng;	

		var long_name = $scope.place.address_components;
		long_name = long_name[long_name.length-1].long_name
		$scope.addCity(lat, lon, $scope.place.formatted_address, $scope.place.address_components)
	}

	$scope.addCity  = function (lat, lng, formattedAddress, components){
     	$scope.exception_country_city = ['Singapore'];
         console.log("lat====="+lat);
         console.log("long====="+lng);
         console.log("address====="+formattedAddress);
         //console.log("formattedAddressCountry====="+formattedAddressCountry);

         if(!lat && !lng && !formattedAddress){

            $scope.errorMessage = "please enter a valid location";
        }else{
        	    $scope.city2 = false;
        	    var formattedAddressCountry = $scope.city;
				formattedAddressCountry = formattedAddressCountry.split(', ');
        	    formattedAddressCountry = formattedAddressCountry[formattedAddressCountry.length - 1]
        	    //console.log(formattedAddressCountry);
        	    //console.log("tst -----");
        	    //return;
        		//console.log("googale api "+JSON.stringify($scope.autocomplete.getPlace()));
        		angular.forEach(components, function(value, key) {
				  //console.log("googale value "+JSON.stringify(value));
				  	if( value.types.indexOf('administrative_area_level_1')!==-1){
				  		$scope.city2 = true;
				  	}

				  	if($scope.exception_country_city.indexOf(formattedAddress)!==-1){
				  		$scope.city2 = true;
				  	}
				});

			//	return;
                  if( $scope.city2 === false){
                  		//console.log("error ---");
                  		appServices.alert("please do not enter country");
                  		return;

        			}else{
        					//Check Travel City is already present
						request = {
						    cityAddress: formattedAddress
						};
						//console.log("Check Travel City is already present");
						//console.log(request);

						appServices.post(API_URL.checkTravelCityPresent, {request: request}, function(response){
							if (response.status == 1 && response.data.length == 0) {
						        console.log("If Part");
						        console.log("Add travel City Response");
						        console.log(response);
						        /*******----------------------**********-----*******/
						        if ($routeParams.travelLocationId) {
						            console.log("routeParam Present");

						            //Update City
						            request = {
						                id: $routeParams.travelLocationId,
						                cityAddress: formattedAddress,
						                locationType: "city"
						            };
						            console.log(request);
						            $http.post($rootScope.STATIC_URL + 'travelLocations/updateTravelLocation', {
						                request: request
						            }).success(function(response) {
						                if (response.status == 1) {
						                    console.log("Update Country");
						                    console.log(response);
						                    //$scope.updateLcId = response.data.id;
						                    $location.path('/landingpage');
						                    //  $window.location.href = $rootScope.hashbang + "landingpage";

						                }


						            }).error(function() {
						                $scope.errorMessage = "Please Try Again";
						                $timeout(function() {
						                    $scope.errorMessage = false;
						                }, 3000);
						            });

						        } else {
						            //Add Travel Location
						            request = {
						                latitude: lat,
						                longitude: lng,
						                cityCountryname: formattedAddressCountry,
						                cityAddress: formattedAddress,
						                locationType: "city"
						            };
						            

						            appServices.post(API_URL.addTravelLocation,{request: request}, function(response2){	
						            	if (response2.status == 1) {
						                    //console.log("Add travel City Response");
						                    //console.log(response);
						                    appServices.alert("New City has been added.");
						                    $location.path('/my-locations');
						                    //$window.location.href = $rootScope.hashbang + "landingpage";
						                }else{
						                	appServices.alert("Please Try Again");
						                	return;
						                }
						            })

						            /*$http.post($rootScope.STATIC_URL + 'travelLocations/addTravelLocation', {
						                request: request
						            }).success(function(response) {
						                if (response.status == 1) {
						                    console.log("Add travel City Response");
						                    console.log(response);
						                    $location.path('/landingpage');
						                    //$window.location.href = $rootScope.hashbang + "landingpage";
						                }
						            }).error(function() {
						                $scope.errorMessage = "Please Try Again";
						                $timeout(function() {
						                    $scope.errorMessage = false;
						                }, 3000);
						            });*/



						        }

						    } else {
						        console.log("Else Part");
						        appServices.alert("Location already added");
						        return;

						    }
						})

						/*$http.post($rootScope.STATIC_URL + 'travelLocations/checkTravelCityPresent', {
						    request: request
						}).success(function(response) {
						    console.log(response);
						    if (response.status == 1 && response.data.length == 0) {
						        console.log("If Part");
						        console.log("Add travel City Response");
						        console.log(response);

						        if ($routeParams.travelLocationId) {
						            console.log("routeParam Present");

						            //Update City
						            request = {
						                id: $routeParams.travelLocationId,
						                cityAddress: formattedAddress,
						                locationType: "city"
						            };
						            console.log(request);
						            $http.post($rootScope.STATIC_URL + 'travelLocations/updateTravelLocation', {
						                request: request
						            }).success(function(response) {
						                if (response.status == 1) {
						                    console.log("Update Country");
						                    console.log(response);
						                    //$scope.updateLcId = response.data.id;
						                    $location.path('/landingpage');
						                    //  $window.location.href = $rootScope.hashbang + "landingpage";

						                }


						            }).error(function() {
						                $scope.errorMessage = "Please Try Again";
						                $timeout(function() {
						                    $scope.errorMessage = false;
						                }, 3000);
						            });

						        } else {
						            //Add Travel Location
						            request = {
						                latitude: lat,
						                longitude: lng,
						                cityCountryname: formattedAddressCountry,
						                cityAddress: formattedAddress,
						                locationType: "city"
						            };
						            $http.post($rootScope.STATIC_URL + 'travelLocations/addTravelLocation', {
						                request: request
						            }).success(function(response) {
						                if (response.status == 1) {
						                    console.log("Add travel City Response");
						                    console.log(response);
						                    $location.path('/landingpage');
						                    //$window.location.href = $rootScope.hashbang + "landingpage";
						                }
						            }).error(function() {
						                $scope.errorMessage = "Please Try Again";
						                $timeout(function() {
						                    $scope.errorMessage = false;
						                }, 3000);
						            });
						        }

						    } else {
						        console.log("Else Part");
						        $scope.errorMessage = "Location already added";


						    }


						}).error(function() {
						    $scope.errorMessage = "Please Try Again";
						    $timeout(function() {
						        $scope.errorMessage = false;
						    }, 3000);
						});*/
        			}
              }

     }

    $scope.clrMassage = function(){
    	e.massage = {};
    	console.log("Operation Calcelled!");
    	appServices.alert("Operation Calcelled!");
    }

    $scope.saveAvailTimeClick  = function(){

           //var currentDate = new Date();
           var availableTime  = "";
           console.log($scope.avlTimeChange);
           console.log("commonCountryPhoneCodeArrayFirst-------------------------------------------------------------++++++++++++++");
           console.log($scope.commonCountryPhoneCodeArrayFirst);
           console.log("====== massageNowDetails.currentPhoneNo  ===========");
           console.log($scope.massageNowDetails.currentPhoneNo);
           if($scope.avlTimeChange){
                availableTime  = $scope.avlTimeChange;
            }else if(typeof($scope.avlTimeChange) == 'undefined'){
                availableTime = $scope.massageNowDetails.massageTime;
            }


            if($scope.massageNowDetails.checked == false && $scope.massageNowDetails.massageTime == "00:00"){
               console.log("Please Both");
               $scope.availableTimeError = "Please mention your availability by selecting the checkbox";

            }else if($scope.massageNowDetails.checked == false){
               console.log("Please check the box");
               $scope.availableTimeError = "Please mention your availability by selecting the checkbox";

            }//current Time greater than Selected Time Check
            else if($scope.massageNowDetails.massageTime){
                    var selectedHour    = parseInt($scope.massageNowDetails.massageTime.split(':')[0]);
                    var selectedMinute  = parseInt($scope.massageNowDetails.massageTime.split(':')[1]);
                    if( (selectedHour < HELPER_currentHour && selectedMinute < HELPER_currentMinute) || (selectedHour == HELPER_currentHour && selectedMinute < HELPER_currentMinute)){
                          console.log("hi ------------");
                          $scope.availableTimeError = "Entered time must be greater than current time";
                              //$timeout(function () {
                                   // $scope.availableTimeError = false;
                              //}, 3000);
                              return false;
                    }
                    else if($scope.massageNowDetails.massageTime == "00:00" && $scope.avlTimeChange == "00:00"){
                                $scope.availableTimeError = "Please mention the time till when you are available";
                               //$rootScope.showloader                =   false;
                    }
                    else if($scope.massageNowDetails.currentPhoneNo || $scope.commonCountryPhoneCodeArrayFirst != 0){
                        //console.log("$scope.commonCountryPhoneCodeArrayFirst -------------------------------");
                        //console.log($scope.commonCountryPhoneCodeArrayFirst);
                       // return false;
                             /*if(!$scope.commonCountryPhoneCodeArrayFirst){
                                    console.log("$scope.commonCountryPhoneCodeArrayFirst ====== NOT SELECT");
                                    console.log($scope.commonCountryPhoneCodeArrayFirst);
                                    //$scope.availableTimeError = "Please mention the time till when you are available";
                             }*/
                             if($scope.commonCountryPhoneCodeArrayFirst == 0){
                                    console.log("Zero ========");
                                    $scope.availableTimeError = "Please select your country code";
                             }
                             else{
                                       console.log("$scope.commonCountryPhoneCodeArrayFirst ======  SELECT");
                                       console.log($scope.commonCountryPhoneCodeArrayFirst);
                                       console.log("saved numberrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
                                       //var numbercheck = /^\d{10}$/;
                                       //console.log($scope.massageNowDetails.currentPhoneNo);
                                       //console.log(isNaN($scope.massageNowDetails.currentPhoneNo));
                                       //console.log($scope.massageNowDetails.currentPhoneNo.match(numbercheck));
                                       //console.log(/^[0-9]{5,15}$/.test($scope.massageNowDetails.currentPhoneNo));

                                       if(!(/^[0-9]{5,15}$/.test($scope.massageNowDetails.currentPhoneNo))){
                                          $scope.availableTimeError = "Please enter a valid mobile number";

                                       }else{
                                        saveMassageNow();
                                       }
                            }


                    }
                    else{
                                saveMassageNow();
                    }
            }

            $timeout(function () {
                $scope.availableTimeError = false;
            }, 3000);


                function saveMassageNow(){
                    /*var today = new Date();
                    var dd = today.getDate();
                            var mm = today.getMonth()+1; //January is 0!
                            var yyyy = today.getFullYear();

                            if(dd<10) {
                                dd='0'+dd
                            }

                        if(mm<10) {
                            mm='0'+mm
                        }
                        today = mm+"/"+dd+"/"+yyyy;
                        console.log(today);*/
                        console.log($scope.avlTimeChange);
                        var availableTimeSplit = availableTime.split(":");
                        availableTime = HELPER_DATE_SLASH_M_D_Y+" "+availableTime;
                        if($scope.massageNowDetails.currentPhoneNo){
                            console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                            //console.log($scope.commonCountryPhoneCodeArrayFirst);
                            //console.log($scope.commonCountryPhoneCodeArrayFirst.dial_code);
                            console.log($scope.commonCountryPhoneCodeArrayFirst)
                                request = {availableTime: availableTime, phoneNumber: $scope.commonCountryPhoneCodeArrayFirst + "|" + $scope.massageNowDetails.currentPhoneNo};
                        }else{

                                request = {availableTime: availableTime, phoneNumber: $scope.massageNowDetails.currentPhoneNo};
                        }
                        console.log("request ================================++++++++++++++++++++++++++++++++++++++++++");
                        console.log(request);
                        $http.post($rootScope.STATIC_URL + 'massagenow/addMassageNow', {request: request}).success(function (response) {
                            if (response.status == 1)
                            {
                                console.log("Add Massage Now");
                                console.log(response);
                                $rootScope.showloader                =   false;
                                //$scope.massageNowSuccess             =   "Successfully saved";
                                var massageNowSuccess={status:true,message: "Successfully saved"};
                                $rootScope.addAlert(massageNowSuccess);
                                $timeout(function () {
                                    //$scope.massageNowSuccess = false;
                                }, 3000);

                            }
                        }).error(function () {
                            $scope.errorMessage = "Please Try Again";
                            $timeout(function () {
                                $scope.errorMessage = false;
                            }, 3000);
                        });

                    }


  }
}

