/*
	name : public controller
	function : login, signup, modal , contact us
    */

    angular.module('zenbrisa.public.Controller',['service']).
    controller('loginCtrl', loginCtrl).controller('contactus', contactus);

//controller injector
loginCtrl.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location'];


function loginCtrl(e,mdDialog, appServices,localStorageService,rootScope,$location)
{ 

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
            e.alert={'message':"Processing..",'type':'alert-success'}

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
};

    //forget password 
    e.forgetPassword= function(form,data)
    {           

        e.alert={'message':"Processing..",'type':'alert-success'}
        if(form.$valid)
        {

           appServices.post(API_URL.forgetPassword,data, function(response)
           {   
            if(response.message=='email_notexist')
            {
               e.alert={'message':"Sorry! We weren't able to identify you by the information provided.",'type':'alert-danger'};
           }
           else
           {

            if(response.data[0].status=='active')
            {

               e.alert={'message':"You will receive an email from us with instructions for resetting your password. If you don't receive this email, please check your junk mail folder or visit our Help pages to contact Customer Service for further assistance.",'type':'alert-success'};
               e.isforgetPassword=true;
           }
           else
           {
            e.alert={'message':"Your account is not active please activate your account or contact to administrator",'type':'alert-danger'};
        }

    }
});

       }
   } 
};

//contact us controller

//controller injector
contactus.$inject=['$scope','appServices','$rootScope','$location'];

function contactus(e,appServices,rootScope,location)
{
    e.user={};
    e.contacts= function(form,data){
        if(form.$valid)
        {
           e.alert={'message':"Processing..",'type':'alert-success'}

           console.log(data);
           data["url"]="https://www.zenbrisa.com/images/";

           appServices.post(API_URL.contactusMail,data, function(response)
           {   
            if(response.status==1)
            {
               e.user={};

               e.alert={'message':"Hey, thanks for showing interest to contact us! We shall get back to you very soon..",'type':'alert-success'};
                form.$setPristine();
             }  
             else
             {
               e.alert={'message':"Error: Please type again",'type':'alert-danger'}; 
             }
           });
       }
   }

}