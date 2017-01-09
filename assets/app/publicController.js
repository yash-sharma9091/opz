/*
	name : public controller
	function : login, signup, modal , contact us
    */

    angular.module('zenbrisa.public.Controller',['service'])
    .controller('loginCtrl', loginCtrl)
    .controller('contactus', contactus)
    .controller('profileStepCtrl', profileStepCtrl);

//controller injector
loginCtrl.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location'];


function loginCtrl(e,mdDialog, appServices,localStorageService,rootScope,$location)
{ 

	e.cancel = function() 
	{
     mdDialog.cancel();
 };

var dashbaord_url;
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
          rootScope.logout();

          e.alert={'message':"Success",'type':'alert-success'};

          if(data.remember==false)
          {
             localStorageService.set("user", response.data.token, "sessionStorage");
         }
         if(data.remember==true)
         {
             localStorageService.set("user", response.data.token, "localStorage");
         }

    						//redirect to dashboard page
                appServices.loader("Please wait.. while we'r checking your profile details.");
                
    						var url=appServices.getSessionStorage('redirectUrl');
                rootScope.isUserLogin=appServices.checkStorage('user');
    						if(url)
    						{
    							
    						  dashbaord_url=url
    						}
                 else
                 {
                   
                    var user={"email":rootScope.isUserLogin.email};
                    if(response.profileCompleteStatus==0)
                    {
                        dashbaord_url='/setting';              
                       rootScope.getUserProfile(user,'profile');

                    }
                     if(response.profileCompleteStatus==1)
                    {
                      dashbaord_url='/home';
                       rootScope.getUserProfile(user);

                    }
                    

                }
                        mdDialog.cancel();
                        $location.path(dashbaord_url);
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

};

//profile step complete 
profileStepCtrl.$inject=['$scope','appServices','$rootScope','$location','$mdDialog','NgMap','$timeout'];

function profileStepCtrl(e,appServices,rootScope,location,mdDialog,NgMap,$timeout)
{
    e.cancel = function() 
  {
     mdDialog.cancel();
 };

 //set profile data if updated
 e.user={};
 e.step=1;
 if(rootScope.userprofile)
 {
  e.user=rootScope.userprofile;

}


 //get country list
 appServices.getCountry(function(response){
    e.country=response;
  });


//create year 
      e.years=[];
      var yearLimit = new Date().getFullYear() - 18;
      for (var i=yearLimit;i>1930;i--)
      {
        e.years.push(i);

      }

e.fullAddress={}

e.placeChanged = function() 
{
  e.place = this.getPlace();

  e.fullAddress={}
  var address=e.place.address_components;

  e.fullAddress['fulladress']=address;
  if(e.place)
  {
    e.fullAddress["location"]=JSON.parse(JSON.stringify(e.place.geometry.location));
  }
  angular.forEach(address, function(value,key)
  {
  
        //get country
        angular.forEach(value.types, function(node,key){
                
                  if(node=='country')
                  {
                    e.fullAddress["country"]={"name":value.long_name,"code":value.short_name};

                  }
                  if(node=='administrative_area_level_1')
                        {
                          e.fullAddress["state"]={"name":value.long_name,"code":value.short_name};
                        }

                  if(node=='postal_code')
                        {
                          e.fullAddress["postal_code"]={"name":value.long_name,"code":value.short_name};
                        }
            });
           
        });
 

      NgMap.getMap().then(function(map)
      {
          e.map = map;
          e.map.setCenter(e.place.geometry.location);
         
      });

      }
      
      e.CheckFullAddress= function(event,user){
        if(user)
        {
            delete user['fulladress'];
        }
      }

      var flag=0;
      e.userProfiledata={};
      //submit form
      e.updateProfile = function(form,data)
      {
        if(form.$valid)
        {
        e.alert='undefined';
       
        //process step-1
        if(e.step==1)
        {
        //check user age 
        var age=getAge(data.dob.month+'/'+data.dob.month+'/'+data.dob.year);

        if(age.age<18)
        {
          e.alert={'message':"You must be 18 years old",'type':'alert-danger'}; 
        }
        
        }
        if(e.step==2){
          //set map center
              if(rootScope.userprofile)
              {

              // NgMap.getMap().then(function(map)
              // {
              //   e.map = map;
              //   e.loc=rootScope.userprofile.fulladress.location;
              //   var center = new google.maps.LatLng(loc.lat, loc.lng);
               
              // $timeout(function(){
              //      console.log(rootScope.userprofile.fulladress.location);
              //     e.map.setCenter(center);
              //   },400)
              // });


              }
        }
        if(e.step==3)
        {   

          


            if(data.address)
            {
              
              if(!e.place && !data.fulladress)
              {
                  
                  e.alert={'message':"Incomplete address, please provide atleast your city",'type':'alert-danger'}; 
                  flag=1;
              }
              else{
                 flag=0;
              }
             
            }
           
        }
        if(flag==0)
        {
         e.step=e.step+1;
        }

        //final data
        if(Object.keys(e.fullAddress).length>0)
        {
            data["fulladress"]=e.fullAddress;
        }


        //push data on server
         if(e.step === 4)
             {
               data['profileComplete']=true;
            }
          
            var userData=rootScope.isUserLogin;
            userData['data']=data;

            rootScope.getUserProfile(userData)

            console.log(JSON.stringify(data));     
      }
      else
      {
            if(  e.step==3)
            {
            if(!data.address)
            {
            
               e.alert={'message':"Incomplete address, please provide atleast your city",'type':'alert-danger'}; 
 
           }
           }//end step if
         } //end else 
      }
}
