/*
	name : public controller
	function : login, signup, modal 
*/

angular.module('zenbrisa.public.Controller',['service']).
controller('loginCtrl', loginCtrl).controller('loginCtrl', loginCtrl);

//controller injector
loginCtrl.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location'];


function loginCtrl(e,mdDialog, appServices,localStorageService,rootScope,$location)
{ e.isSignupSuccess=false;

	e.cancel = function() 
	{
    	  mdDialog.cancel();
    };

//user login form
    e.userLogin =function(from,data)
    {
    	
    	if(from.$valid)
    	{		
    		
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

    //user signup form
    e.signupForm= function(form,data)
    {
            if(form.$valid)
            {
                  
                    if(data.agree==false)
                    {
                            e.alert={'message':"Please accept Zenbrisa term and condition",'type':'alert-danger'};
                    }
                    else if(data.password!=data.confirmpassword)
                    {
                             e.alert={'message':"Confirm password not match",'type':'alert-danger'};
                    }
                    else{

                        appServices.post(API_URL.signup,data, function(response)
                        {   
                            if(response.status==2)
                            {
                                 e.alert={'message':"This email is already registered please choose another one",'type':'alert-danger'};
                            }
                            else
                            {
                                 e.isSignupSuccess=true;
                                 e.alert={'message':"Thank you for signing up with Zenbrisa! The verification email has been sent to your email address. Please open right away and enter your email and password to complete membership process!",'type':'alert-success'};
                            }
                        });
                    
                    }
            }
    }   
};