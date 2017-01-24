/*
	name : public controller
	function : login, signup, modal , contact us

*/

angular.module('zenbrisa.public.Controller',['service'])
.controller('loginCtrl', loginCtrl)
.controller('contactus', contactus)
.controller('profileStepCtrl', profileStepCtrl);

//controller injector
loginCtrl.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout'];


function loginCtrl(e,mdDialog, appServices,localStorageService,rootScope,$location,timeout)
{ 
  e.navabar=rootScope.navbar;


	e.cancel = function() 
	{
     mdDialog.cancel();
 };

var dashbaord_url;

///checkusername
e.checkUsrname= function(query,form){
  var user={username:query};

  timeout(function(){
    e.checking=true;
  appServices.post(API_URL.checkuserName,user, function(response)
     {
      if(response.message==='username_exists')
      {
           form.username.$setValidity("username", false);
           
      }
      else if(response.message==='no_username')
      {
        form.username.$setValidity("username", true);
         
      }
      else
      {
         
        form.username.$setValidity("username", true);
      }
      
       e.checking=false;
     });
  },650)
}

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
          
          appServices.logout();

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
                       // appServices.loader("Please wait.. while we'r checking your profile details.");
                
            
                       dashbaord_url='/setting';              
                       rootScope.getUserProfile(user,'profile');

                    }
                     if(response.profileCompleteStatus==1)
                    {
                      
                      dashbaord_url='/home';
                      mdDialog.cancel();
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
                   e.alert={'message':data.message,'type':'alert-danger'};
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
contactus.$inject=['$scope','appServices','$rootScope','$location','$timeout'];

function contactus(e,appServices,rootScope,location, timeout)
{   
  e.searchTerm;

  e.keyDown= function(ev){
      ev.stopPropagation();
  }
   // element.find('input').on('keydown', function(ev) {
   //        ev.stopPropagation();
   //    });


    e.loadCountry = function(){
      return timeout(function() {
        e.countries =rootScope.country;
        },100);
    }

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

e.setMapcenter= function(pos){

  NgMap.getMap().then(function(map)
  {
      e.map = map;
      e.map.setCenter(new google.maps.LatLng(pos.lat, pos.lng));
   
  });
}

 //set profile data if updated
 e.user={};
 e.step=1;
 e.fullAddress={};

 if(rootScope.userprofile)
 {  
    var userprofile=rootScope.userprofile;

    e.user=rootScope.userprofile;
    //set address on load
  
    var location={'latitude':userprofile['latitude'],"longitude":userprofile['longitude']};
    e.fulladdress=strToAddress(userprofile['country'],userprofile['streetAddress'],userprofile['extendedAddress'],userprofile['state'],userprofile['city'],userprofile['zipcode'],location);
  

    //set map center
    var loc={'lat':userprofile['latitude'], "lng":userprofile['longitude']};
   /// console.log(loc);
    e.setMapcenter(loc);

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



e.placeChanged = function() 
{

e.place = this.getPlace();
e.fullAddress={};
$timeout(function(){
var country = angular.element(document.querySelector(".country-name")).html();
var streetAddress=angular.element(document.querySelector(".street-address")).html();
var extendedAddress=angular.element(document.querySelector(".extended-address")).html();
var state=angular.element(document.querySelector(".region")).html();
var city=angular.element(document.querySelector(".locality")).html();
var postal=angular.element(document.querySelector(".postal-code")).html();
var location=JSON.parse(JSON.stringify(e.place.geometry.location));

e.fulladdress=strToAddress(country,streetAddress,extendedAddress,state,city,postal,location)


 NgMap.getMap().then(function(map)
  {
      e.map = map;
    
      e.map.setCenter(e.place.geometry.location);
    
  });


},100);

} //end function get places

      
      e.CheckFullAddress= function(event,user)
      {
        if(user)
        {
            delete user['fulladdress'];
        }
      }

      var flag=0;
      e.userProfiledata={};

      e.stepBack= function(){
          e.step=e.step-1;
        
      }
      //submit profile form  step 
      e.updateProfile = function(form,data)
      {
        if(form.$valid)
        {
        
     
        data['profileComplete']=false;
        e.alert='undefined';

        //profile step 1
        if(e.step==1)
        {
          
            var age=getAge(data.dob.month+'/'+data.dob.day+'/'+data.dob.year);

            if(age.age<18)
            {
              e.alert={'message':"You must be 18 years old",'type':'alert-danger'}; 
            }
            else
            { 
                e.step=2;
                e.user['dobOne']=strToDate(data.dob.year,data.dob.month,data.dob.day);
                
            }
        }

        //profile step 2
        else if(e.step==2)
        {


        e.step=3;
        //set map center if exist
        var loc={'lat':parseFloat(userprofile['latitude']), "lng":parseFloat(userprofile['longitude'])};
        e.setMapcenter(loc);
           
        }
         //profile step 3
        else if(e.step==3)
        {
        //set map center



          if(data.address)
            {
             
              if(!e.place && !data.address)
              {
                  e.alert={'message':"Incomplete address, please provide atleast your city",'type':'alert-danger'}; 
                  return false; 
              }
              else
              { 
                if(!e.fulladdress['city'])
                {
                  e.alert={'message':"Please provide your city, type your full address",'type':'alert-danger'}; 
                  return false; 
                }
                else
                {
                   e.step=4;
                  
                }
              }
          }
             }
        //profile step 4
        else if(e.step==4)
        {
          data['profileComplete']=true;
          if(Object.keys(e.fulladdress).length>0)
          {
            data=setJsonData(data,e.fulladdress);
          }

           e.step=5;
           console.log(data);
        }
        
        //send data on server
        userData=rootScope.isUserLogin;
        userData["data"]=data;
        rootScope.getUserProfile(userData);
       
         } //end else 

      }

  //add seeking_exchange
  e.seeking_exchange = function(data)
  {
 
      if(data=='female')
      {
        e.user['seeking_female']=data;

        delete e.user['seeking_male'];
        delete e.user['seeking_both'];

      }
      else if(data=="male")
      {
        e.user['seeking_male']=data;
        delete e.user['male'];
        delete e.user['seeking_both'];

      }
      else if(data=="both")
      {
        e.user['seeking_both']=data;
        e.user['seeking_female']='female';
        e.user['seeking_male']="male";
      }
      
    }//end seeking fun

 }
