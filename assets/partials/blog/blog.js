
angular.module('zenbrisa.blog',[])
.controller('blog', blog);

blog.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout'];

function blog(e,mdDialog, appServices,localStorageService,rootScope,location,timeout)
{	
	e.loading=true;
		var data={};
	
		appServices.post(API_URL.blogList,data, function(response)
		{	
			e.loading=false;
			e.data=response.data;

		}); 
}
