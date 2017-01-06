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
})

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
	$rootScope.camposemail=function(ev)
	{
			appServices.modal('partials/template/campose-mail.html', loginCtrl, ev)
	}
	$rootScope.addvideo=function(ev)
	{
			appServices.modal('partials/template/add-video.html', loginCtrl, ev)
	}
	$rootScope.profileStep=function(ev)
	{
		appServices.modal('partials/dashboard/profile-step.html', profileStepCtrl, ev)
	};
	
	
}])

//check login session 
.run(['$rootScope','appServices','$location','localStorageService', function($rootScope,appServices,$location,localStorageService){
	
	if(appServices.checkStorage('user'))
	{
		$rootScope.isUserLogin=appServices.checkStorage('user');
	}

	else
	{
		$rootScope.isUserLogin=false;
	}

	$rootScope.$on("$routeChangeSuccess", function(event,current ,prev){
		
		if(current.access.login==true)
		{
				
				appServices.sessionStorage("redirectUrl",$location.path());

				if($rootScope.isUserLogin==false)
				{
					$rootScope.login();
					$location.path('/');
				}
		}

		$('body, html').animate({
				scrollTop:0
			},900);

	});

	$rootScope.logout= function()
	{
		
		appServices.logout();
		$rootScope.isUserLogin=false;
		$location.path('/');

	};

	//get user profile
	$rootScope.getUserProfile= function(data,profile){

			if($rootScope.isUserLogin)
			{

						 appServices.post(API_URL.userprofileStepNew,data, function(response)
						    { 
						     //  console.log(response);
						       $rootScope.userprofile=response.result;
						       $rootScope.userprofile={"userInfoId":4433,"fullName":"mahendra singh","username":null,"email":"mahendra_singh@seologistics.com","profilePic":null,"subscriptionPackageId":null,"subscriptionType":"free","subscriptionStartDate":null,"subscriptionExpiredDate":"2017-01-24T00:00:00.000Z","completeProfile":0,"id":4191,"userId":4433,"gender":"male","telephone":null,"zipcode":null,"country":null,"state":null,"city":null,"latitude":"0","longitude":"0","therapeuticMassageOne":null,"therapeuticMassageOneDesc":null,"prefer_therapeuticMassage":null,"sensualMassageOne":null,"sensualMassageOneDesc":null,"prefer_sensualMassage":null,"prefer_massage_exchange":null,"prefer_massage_paid":null,"dobOne":null,"ageOne":null,"languageOne":null,"bodyTypeOne":null,"heightOne":null,"drinkingHabitOne":null,"smokingHabitOne":null,"massageFrequencyOne":null,"levelTypeOne":null,"professionalType":null,"levelTypeOneOther":null,"experienceOne":null,"massageStylesOne":null,"massageStylesOneOther":null,"trainingHoursOne":null,"therapeuticMassageTwo":null,"therapeuticMassageTwoDesc":null,"sensualMassageTwo":null,"sensualMassageTwoDesc":null,"dobTwo":null,"ageTwo":null,"languageTwo":null,"bodyTypeTwo":null,"heightTwo":null,"drinkingHabitTwo":null,"smokingHabitTwo":null,"massageFrequencyTwo":null,"levelTypeTwo":null,"professionalTypeTwo":null,"levelTypeTwoOther":null,"experienceTwo":null,"massageStylesTwo":null,"massageStylesTwoOther":null,"trainingHoursTwo":null,"currentPhoneNo":null,"lastLoggedin":null,"availableTime":"0000-00-00 00:00:00","reviewSentCount":0,"reviewReceivedCount":0,"publicPhotoCount":0,"privatePhotoCount":0,"avgRating":3,"reviewsPenned":0,"favouriteCount":0,"blockedCount":0,"adProfExpDate":"0000-00-00 00:00:00","seeking_male":"","seeking_female":"","seeking_both":"","aboutme":"sdfsdfsdfsdfsdf  sd f sd f sd f sd fsdfsdf","createdAt":"2017-01-04T06:40:00.000Z","updatedAt":"2017-01-04T06:40:00.000Z","dob":{"day":"3","month":"3","year":"1997"},"exchange":"female","interests":"sensual","experience":"professional","address":"New York, NY, United States","fulladress":{"fulladress":[{"long_name":"New York","short_name":"New York","types":["locality","political"]},{"long_name":"New York","short_name":"NY","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]}],"location":{"lat":40.7127837,"lng":-74.00594130000002},"state":{"name":"New York","code":"NY"},"country":{"name":"United States","code":"US"}},"profileComplete":true,"alias":"mahendra","profilePicture":'/images/profile-img.jpg','aliasOption':'false'};
						       	if($rootScope.userprofile.aliasOption=='true')
						       	{
						       		$rootScope.userprofile['fullName']=$rootScope.userprofile.aliasOption;
						       	}
						       	$rootScope.reating=5;

						    	if(profile)
						    	{
						    		$rootScope.profileStep();
						    	}
						    });
			}
	}

	if($rootScope.isUserLogin)
	{
		var user={"email":$rootScope.isUserLogin.email};
		$rootScope.getUserProfile(user);

	}

	$rootScope.getAge=function(age)
		{
		
		if(age)
		{
				return getAge(age.month+'/'+age.month+'/'+age.year).age;
		}
	}
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
			'usersideNavbar':'partials/template/user-side-navbar.html'
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
		"url": "/#",
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
	"search":{"title":"Search", 
	"submenu":{ "SearchByLocation":{"title":'Search By Location',"href":"#/"},"SearchMembers":{"title":'Search Members',"href":"#/"} }
	},
	"mailbox":{"title":"Mailbox","href":"#/"},
	"profile":{"title":"Profile",
	"submenu":{ 
		"myprofile":{"title":'My Profile',"href":"#/my-profile"},
		"profileEdit":{"title":'Edit Profile Details','click':'updateProfile'} ,
		"photogallery":{"title":'Photo Gallery',"href":"#/home"},
		"videogallery":{"title":'Video Gallery',"href":"#/home"},
		"packages":{"title":'Membership',"href":"#/home"},
		"refer":{"title":'Refer Friend Bonus',"href":"#/home"},
		"bonushistory":{"title":'Bonus History',"href":"#/home"},
		"mylocations":{"title":'My Locations',"href":"#/home"}
	}
},
	
	"community":{"title":"Community", 
	"submenu":{ "Blogs":{"title":'Blogs',"href":"#/home"},
				"polls":{"title":'Polls',"href":"#/home"} }
	},
	"advertise":{"title":"Advertise ", 
	"submenu":{ "subscription":{"title":'Ad Subscription',"href":"#/home"},
				"adrequest":{"title":'Ad Request',"href":"#/home"} }
	}

}

$rootScope.userDashboard={
	'setting':{'title':'Setting', 'href':'#/setting'}
}


		  $rootScope.openNav= function(){
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

