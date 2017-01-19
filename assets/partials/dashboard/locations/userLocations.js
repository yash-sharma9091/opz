angular.module('userLocationsModule',[]).controller('userLocations', userLocations);

userLocations.$inject=['$scope', '$rootScope','appServices','$location'];

function userLocations(e, rootscope, appServices, $location)
{
	e.getSavedLocations = function(){
		var data = {};
		appServices.post(API_URL.getTravelLocations, data, function(response)
	     {
	     	console.log(response)
	     	/*Get Current User Saved Locations*/
	     	if(response.status == 1){
	     		/*If Response is not empty*/
	     		e.myLocations = response.data;
	     	}
		});
	}
}

