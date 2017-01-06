angular.module('userDashboardModule',[]).controller('userDashboard', userDashboard);

userDashboard.$inject=['$scope', '$rootScope','appServices'];

function userDashboard(e, rootscope,appServices)
{
	e.user={};
	e.setting= function()
	{
		
			appServices.post(API_URL.setting,e.user, function(response)
           {   
           		console.log(response)
           		e.user=response.data;
           });
	}

	//e.setting();
}

