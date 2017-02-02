// JavaScript Document
angular.module('zenbrisa.app')
.run(function($log,$location){
	$log.info("zenbrisa Application, Beta Version 1.2 @ flexsin Technology India")
	// console.log($location.absUrl());
})
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue')
    .accentPalette('blue');
	$mdThemingProvider.theme('error');
	$mdThemingProvider.theme('loader');
	$mdThemingProvider.theme('success');
})

.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) 
  {
    return moment(date).format('YYYY-MM-DD');
  }})

//open modal and popupwindow function
.run(['$rootScope','$mdDialog','appServices','cfpLoadingBar',function($rootScope, $mdDialog,appServices,cfpLoadingBar){
	cfpLoadingBar.start();

	//login modal
	$rootScope.login=function(ev)
	{
			appServices.modal('partials/template/login.html', loginCtrl, ev)
	}

	$rootScope.signup=function(ev)
	{
			appServices.modal('partials/template/signup.html', loginCtrl, ev)
	}
	$rootScope.camposemail=function(ev,id,username)
	{		
			//public controller
			var data={};
			data.id=id;
			data.username=username;
			data.user=$rootScope.isUserLogin;
			appServices.modal('partials/template/campose-mail.html', composeEmailPublic, ev,data);
	}
	
	$rootScope.sendPhotoKeySearch= function(ev,id)
		{
		var data={};
			data.id=id;
		
		appServices.modal('partials/dashboard/photoKey/send-photo-key.html', sendPhotoKeyCtrl, ev,data);
		}


	$rootScope.profileStep=function(ev)
	{
		appServices.modal('partials/dashboard/userProfile/profile-step.html', profileStepCtrl, ev);
	};

	$rootScope.cropImage=function(ev,user)
	{	
		console.log(user);

		var data={};
			data['userId']=user.userId;
			data['username']=user.username;
			data["image"]=user.profilePic;
			

		appServices.modal('partials/dashboard/userProfile/crop.profile.image.html',cropImage, ev,data);
	};


}])

//check login session 
.run(['$rootScope','appServices','$location','localStorageService','$sce', function($rootScope,appServices,$location,localStorageService,$sce){
	
	if(appServices.checkStorage('user'))
	{
		$rootScope.isUserLogin=appServices.checkStorage('user');
	}

	else
	{
		$rootScope.isUserLogin=false;
	}

	$rootScope.$on("$routeChangeSuccess", function(event,current ,prev){
		$rootScope.userInfoCount=false;
		if(current.access.login==true)
		{
				
				appServices.sessionStorage("redirectUrl",$location.path());

				if($rootScope.isUserLogin==false)
				{
					$rootScope.login();
					$location.path('/');
				}
				//check pages
		}

	
		$('body, html').animate({
				scrollTop:0
			},900);

	});

$rootScope.goToPage= function(url){
	$location.path(url);
}
//open user profile 
$rootScope.userProfileView= function(id)
{	
	$location.path('/profile/'+id);
}
//header profile expend

$rootScope.headerExp=true;
$rootScope.userHeaderExp= function()
{
	$rootScope.headerExp=!$rootScope.headerExp;
}
$rootScope.closeAlert= function(alert){

	alert=false;
}
	$rootScope.logout= function()
	{
		
		var data= {'token':$rootScope.isUserLogin.token};
		appServices.post(API_URL.logout, data, function(response){
		appServices.logout();
		$rootScope.isUserLogin=false;
		$location.path('/');
		});
		
	};

	//get user profile
	$rootScope.getUserProfile= function(data,profile){

			if($rootScope.isUserLogin)
			{

						
						 appServices.post(API_URL.userprofileStepNew,data, function(response)
						    { 
						     	
						      var profileData=response.data;
						    						 
		
									if(profileData)
									{
										
										//remove null node form json object 
										profileData=appServices.removeNull(profileData);
										//convert date to string
										profileData['dob']=getDateStr(profileData['dobOne']);
										
										var age=getAge(profileData['dobOne']);
										//console.log(profileData['dob'])
										profileData['age']=age.age
										

										if(profileData['longitude'])
										{
											profileData['longitude']=parseFloat(profileData['longitude'])
										}
										if(profileData['latitude'])
										{
											profileData['latitude']=parseFloat(profileData['latitude'])
										}
									
										if(!profileData['address'])
										{	
												profileData['address']=profileData['city'] +', ' + profileData['state'] + ', '+ profileData['country'];
												
												var add=profileData['address'];
												console.log(add);
													add.search('undefined');
													
										}
										if(!profileData['fullName'])
										{
											profileData['fullName']=profileData['username'];
										}
                                                                                    
										if(profileData['seeking_male']=='male')
										{
											profileData['exchange']='male';
										}

										if(profileData['seeking_female']=='female')
										{
											profileData['exchange']='female';
										}
										
										if(profileData['seeking_both']=='both')
										{
											profileData['exchange']='both';
										}
										
										if(!profileData['interests'])
										{
										
											if(profileData['therapeuticMassageOne'])
											{
												profileData['interests']='therapeutic';

											}
										}

										$rootScope.userprofile=profileData;
										
										}

										if(profile)
										{
											$rootScope.profileStep(); //open profile modal 
										}
										
								

							}); //end http post

			}
	}

	if($rootScope.isUserLogin)
	{
		var user={"email":$rootScope.isUserLogin.email};
		$rootScope.getUserProfile(user);

	}
	
	$rootScope.getmap= function(lat,lng){

		return lat+','+lng;
	}
	$rootScope.getUrl = function(url)
	{
		 return  $sce.trustAsResourceUrl(url);
	}

	$rootScope.getFormateddate=function(date)
	{
	var d=new Date(date);
	return d.toDateString();
	}
	
	//calulate age 	
	$rootScope.calculateAge=function(dob)
	{

	return getAge(dob).age;
	}
		

		$rootScope.getAge=function(age)
		{
		
		if(age)
		{
				return getAge(age.month+'/'+age.month+'/'+age.year).age;
		}
	};
	
}])

//define template
.run(['$rootScope', function($rootScope){
		$rootScope.template={
			'header':'partials/template/header.html',
			'footer':'partials/template/footer.html',
			'testimonial':'partials/template/testimonial.html',
			'howItWork':'partials/template/how-it-work.html',
			'search':'partials/global-search/search-form.html',
			'priceview':'partials/template/price.html',
			'usersideNavbar':'partials/template/user-side-navbar.html',
			'userProfileHeader':'partials/dashboard/userProfile/user-profile-header.html',
			'photoGalleryContent' :'partials/dashboard/photoGallery/photo-gallery-content.html'
		}
}])

//navbar links
.run(['$rootScope','$location','$mdSidenav', function($rootScope,$location,$mdSidenav){
	$rootScope.navabar=
	{
	"home": {
		"url": "/",
		"title": "Home",
		"icon": "home"
	},
	"aboutUs": {
		"url": "/#/about-us",
		"title": "About us",
		"icon": "account_balance"
	},
	"blog": {
		"url": "/#/blogs",
		"title": "Blog",
		"icon": "contact_mail"
	},
	"faqs": {
		"url": "/#faqs",
		"title": "FAQ",
		"icon": "help_outline"
	},
	"term": {
		"url": "/#term-of-use",
		"title": "Terms of Use",
		"icon": "extension"
	},
	"privacy": {
		"url": "/#privacy",
		"title": "Privacy Statement ",
		"icon": "lock_outline"
	},
	"contactus": {
		"url": "/#contactus",
		"title": "Contact Us",
		"icon": "contact_phone"
	},
	"login": {
		"url": "/#",
		"title": "Login",
		"icon": "account_circle"
	},
	"signup": {
		"url": "/#",
		"title": "Signup",
		"icon": "supervisor_account"
	},
	"FreeMassageExchange": {
		"url": "/#free-massage-exchange",
		"title": "Free Massage Exchange",
		"icon": "accessibility"
	},
	"PaidProfessionalMassage": {
		"url": "/#paid-professional-massage",
		"title": "Paid Professional Massage",
		"icon": "accessible"
	},
	"TherapeuticMassage": {
		"url": "/#therapeutic-massage",
		"title": "Therapeutic Massage",
		"icon": "transfer_within_a_station"
	},
	"SensualMassage": {
		"url": "/#sensual-massage",
		"title": "Sensual Massage",
		"icon": "face"
	},
	"GayMassage": {
		"url": "/#gay-massage",
		"title": "Gay Massage",
		"icon": "pregnant_woman"
	},
	"package": {
		"url": "/#",
		"title": "Packages",
		"icon": "pregnant_woman"
	},
	"advertise": {
		"url": "/#advertise",
		"title": "Advertise with us",
		"icon": "card_membership"
	}
};

$rootScope.menuOpen= function(id)
{
	if(id=='updateProfile')
	{
		$rootScope.profileStep();
	}
}
$rootScope.userNavbar={
	"search":{"title":"Search", "href":"#/search-page"},
	"mailbox":{"title":"Mailbox","href":"#/mailbox"},
	"profile":{"title":"Profile",
	"submenu":{ 
		"myprofile":{"title":'My Profile',"href":"#/profile"},
		"profileEdit":{"title":'Edit Profile Details','click':'updateProfile'} ,
		"photogallery":{"title":'Photo Gallery',"href":"#/photo-gallery"},
		"videogallery":{"title":'Video Gallery',"href":"#/my-video"},
		
		"refer":{"title":'Refer Friend Bonus',"href":"#/refer-friend"},
		// "bonushistory":{"title":'Bonus History',"href":"#/bonus-history"},
		"mylocations":{"title":'My Locations',"href":"#/my-locations"}
	}
},
	
	"community":{"title":"Community", 
	"submenu":{ "Blogs":{"title":'Blogs',"href":"#/blogs"},
				"polls":{"title":'Polls',"href":"#/my-poll"},
				"submitPoll":{"title":'Create new Polls',"href":"#/create-poll" ,'hide':true},
				"allPoll":{"title":'All Poll',"href":"#/all-poll", 'hide':true}
			 }
	},
	"advertise":{"title":"Advertise" , 'href':"#/advertise"
	// "submenu":{ "subscription":{"title":'Ad Subscription',"href":"#/search-page"},
	// 			"adrequest":{"title":'Ad Request',"href":"#/search-page"} }
	}
	// "advertise":{"title":"Advertise", 
	// "submenu":{ "subscription":{"title":'Ad Subscription',"href":"#/search-page"},
	// 			"adrequest":{"title":'Ad Request',"href":"#/search-page"} }
	// }

}

$rootScope.userDashboard=
{
	'setting':{'title':'Setting', 'href':'#/setting'},
	'favorites':{'title':'My Favorites', 'href':"#/my-favourites"},
	'blockedUsers':{'title':'My Blocked List', 'href':"#/blocked-userlist"},
	'reviewspenned':{'title':'Reviews Penned', 'href':"#/reviews-penned"},
	'reviewsreceived':{'title':'Reviews Received', 'href':"#/reviews-received"},
    'myvedio':{'title':'My Vedio ', 'href':"#/my-video"},
    'photoGallery':{'title':'Public Photo Gallery ', 'href':"#/photo-gallery"},
    "writeReviews":{"title":'Write Reviews',"href":"#/write-reviews"}
    
}

  $rootScope.openNav= function()
  {
		$mdSidenav("navbar").toggle()
		.then(function(){
	});
}


}])
//load country data
.run(['$rootScope','$location','appServices', function($rootScope,$location,appServices)
{
	appServices.getCountry(function(response){
		$rootScope.country=response;
	});
	


}]);

