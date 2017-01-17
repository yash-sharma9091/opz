angular.module('userDashboardSearchModule',[]).controller('userDashboardSearch', userDashboardSearch);

userDashboardSearch.$inject=['$scope', '$rootScope','appServices','$location'];

function userDashboardSearch(e, rootscope,appServices,$location)
{
	e.commonMilesArray              = appServices.milesList();
	e.searched = {
		mile : '',
		location : ''
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
			e.searchData['lat'] = parts[1];
			e.searchData['lon'] = parts[2];
		}
		/*Search Results*/
		$location.path('/search').search(e.searchData)
	}
}

