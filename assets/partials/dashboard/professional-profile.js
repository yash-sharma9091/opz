angular.module('zenbrisa.userProfile')
.controller('professinalProfile', professinalProfile);


//controller injector
professinalProfile.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams'];

function professinalProfile(e,mdDialog, appServices,localStorageService,rootScope,$location,timeout,routeParams)
{ 
	appServices.post(API_URL.reportAbuse,promise, function(response)
				{			
			
					if(response.status==1)
					{
					
					
					}
					else
					{
					
					}

					
								
				});

}