angular.module('socialLogin',['google-signin'])
.config(['GoogleSigninProvider', function(GoogleSigninProvider) {
     GoogleSigninProvider.init({
        client_id: '412235814047-nmdus63mrs2pk0eoj5ih2rrqbo5h4qqv.apps.googleusercontent.com',
     });
}]).run(function(){

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

	//facebook setop configure
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '939913279473061',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

	 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) 
  {
 
 
   
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      getBasicProfileFb();
    } else if (response.status === 'not_authorized') 
    {
     
    }
     else 
     {
      FB.login(function(response)
      {
       if (response.status === 'connected') {getBasicProfileFb();}
     }, {scope: 'public_profile,email'});
  
    }
  }
  
  function facebookLogin() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  function getBasicProfileFb() {
  
    FB.api('/me?fields=email,name,gender', function(response) {
   
     
    });
  }
})
.controller('socialLoginCtrl', socialLoginCtrl);

socialLoginCtrl.$inject=['$scope', '$rootScope','$location','GoogleSignin','appServices','localStorageService','$mdDialog','$http','$log'];

function socialLoginCtrl(e,rootScope, location,GoogleSignin,appServices, localStorageService,mdDialog, http,log)
{
	


	//google login
	 e.googleLogin = function (ev) 
	 {

        GoogleSignin.signIn().then(function (user) {
       
           var data=GoogleSignin.getBasicProfile();
           		data["token"]=user.Zi.access_token; 
           		data['type']="google"
           		e.callSignupProcess(data, ev);
 				         
        }, function (err) {
            appServices.alert(err);
        });
    };

    //login with facebook 

    e.facebookLogin = function (ev) 
	 {

	 	 FB.api('/me?fields=email,name,gender', function(response) {
	      
	     
	    });
      
    };


//process signup
e.callSignupProcess= function(data,ev)
{
	var data=data;
 
	e.isLading=true;
	appServices.post(API_URL.socialLoginUrl,data, function(response)
     	{
     			
     			mdDialog.cancel();

     			if(response.status==1)
     			{
 				  appServices.logout();//remove all local session 
				  e.isLading=false;

				  var userdata=response.data.token;
				  	  userdata["publicToken"]=data.token;
				  	  userdata['type']=data.type;
				 

 				  localStorageService.set("user", userdata, "sessionStorage");
 				  rootScope.isUserLogin=appServices.checkStorage('user');

 				  //redirect to dashboard
 				  var token=response.data.token;

				  var redirectUrl=response.firstLogin==true?'/setting':'/search-page';
				  	  location.path(redirectUrl);
				  	  if(response.firstLogin==true)
				  	  {
				  	  	appServices.modal('partials/dashboard/userProfile/profile-step.html', profileStepCtrl, ev, token);
    				  }

    				//call profile update data   
					var promise={email: token.email};
					rootScope.getUserProfile(promise)
    				 
     			}
     			else
     			{
     				appServices.alert("Please Try again?")
     			}
     	});
}

}



