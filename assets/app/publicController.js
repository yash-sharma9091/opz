/*
	name : public controller
	function : login, signup, modal 
*/

angular.module('zenbrisa.public.Controller',['service']).
controller('loginCtrl', loginCtrl).controller('loginCtrl', loginCtrl);

//controller injector
loginCtrl.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location'];


function loginCtrl(e,mdDialog, appServices,localStorageService,rootScope,$location)
{

	e.cancel = function() 
	{
    	  mdDialog.cancel();
    };

    e.userLogin =function(from,data)
    {
    	
    	if(from.$valid)
    	{		
    			console.log(data);
    		
    			e.alert={'message':"Processing..",'type':'alert-success'}

    			appServices.post(API_URL.login,data, function(response)
    			{

    					if(response.status==2)
    					{
    						e.alert={'message':response.message,'type':'alert-danger'};
    						rootScope.isUserLogin=false;
    					}

    					else if(response.status==1)
    					{
    						
    						e.alert={'message':"Success",'type':'alert-success'};
    						
    						if(data.remember==false)
    						{
    							localStorageService.set("user", response.data, "sessionStorage");
    						}
    						if(data.remember==true)
    						{
    							localStorageService.set("user", response.data, "localStorage");
    						}

    						//redirect to dashboard page
    						var url=appServices.getSessionStorage('redirectUrl');
    						if(url)
    						{
    							
    							$location.path(url);
    						}
							else
							{
								$location.path('/home');
							}
    						
    						rootScope.isUserLogin=true;
    						mdDialog.cancel();


    					}
    					
    					
    			});

    	}
   
    }
};