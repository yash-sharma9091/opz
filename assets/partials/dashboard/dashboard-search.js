angular.module('userDashboardSearchModule',[]).controller('userDashboardSearch', userDashboardSearch);

userDashboardSearch.$inject=['$scope', '$rootScope','appServices','$location'];

function userDashboardSearch(e, rootscope,appServices,$location)
{
	e.commonMilesArray              = appServices.milesList();
	e.searched = {
		mile : '',
		location : '',
		type: ''
	}
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
	
}

