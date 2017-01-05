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
	//$rootScope.profileStep();
	
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
	$rootScope.getUserProfile= function(data){

			if($rootScope.isUserLogin)
			{

						 appServices.post(API_URL.userprofile,data, function(response)
						    { 
						       console.log(response);
						       $rootScope.userprofile=response.result;
						    });
			}
	}

	if($rootScope.isUserLogin)
	{
		var user={"email":$rootScope.isUserLogin.email};
		$rootScope.getUserProfile(user);

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
			'priceview':'partials/template/price.html'
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


$rootScope.userNavbar={
	"search":{"title":"Search", 
	"submenu":{ "SearchByLocation":{"title":'Search By Location',"href":"#/"},"SearchMembers":{"title":'Search Members',"href":"#/"} }
	},
	"mailbox":{"title":"Mailbox","href":"#/"},
	"profile":{"title":"Profile",
	"submenu":{ 
		"myprofile":{"title":'My Profile',"href":"#/myprofile"},
		"profileEdit":{"title":'Edit Profile Details',"href":"#/profileEdit"} ,
		"photogallery":{"title":'Photo Gallery',"href":"#/photogallery"},
		"videogallery":{"title":'Video Gallery',"href":"#/videogallery"},
		"packages":{"title":'Membership',"href":"#/refer"},
		"refer":{"title":'Refer Friend Bonus',"href":"#/packages"},
		"bonushistory":{"title":'Bonus History',"href":"#/bonus-history"},
		"mylocations":{"title":'My Locations',"href":"#/mylocations"}
	}
},
	
	"community":{"title":"Community", 
	"submenu":{ "Blogs":{"title":'Blogs',"href":"#/blogs"},
				"polls":{"title":'Polls',"href":"#/polls"} }
	},
	"advertise":{"title":"Advertise ", 
	"submenu":{ "subscription":{"title":'Ad Subscription',"href":"#/Ad-Subscription"},
				"adrequest":{"title":'Ad Request',"href":"#/ad-request"} }
	}

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

