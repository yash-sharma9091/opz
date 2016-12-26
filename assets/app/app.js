// JavaScript Document
angular.module('zenbrisa.app')
.run(function($log,$location){
	$log.info("zenbrisa Application, Beta Version 1.2 @ flexsin Technology India")
	// console.log($location.absUrl());
})

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue')
    .accentPalette('deep-orange');
})

//modal
.run(['$rootScope','$mdDialog','appServices','cfpLoadingBar',function($rootScope, $mdDialog,appServices,cfpLoadingBar){
	cfpLoadingBar.start();
	//login modal
	$rootScope.login=function(ev){
			appServices.modal('template/login.html', loginCtrl, ev)
	}
	$rootScope.signup=function(ev){
			appServices.modal('template/signup.html', loginCtrl, ev)
	}
	$rootScope.camposemail=function(ev){
			appServices.modal('template/campose-mail.html', loginCtrl, ev)
	}
	$rootScope.addvideo=function(ev){
			appServices.modal('template/add-video.html', loginCtrl, ev)
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

.run(['$rootScope','$timeout', function($rootScope,$timeout){
		$rootScope.$on("$locationChangeSuccess", function(event,next,current){
			//scroll to top

			$('body, html').animate({
				scrollTop:0
			},900);
		})
}])
//navbar links
.run(['$rootScope','$location','$mdSidenav', function($rootScope,$location,$mdSidenav){
	$rootScope.navabar={
	"home": {
		"url": "/#",
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
		"url": "/#",
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
	"PaidProfessional Massage": {
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


		  $rootScope.openNav= function(){
				$mdSidenav("navbar").toggle()
				.then(function(){
			});
}

}])

function loginCtrl($scope, $mdDialog){
	$scope.cancel = function() {
      $mdDialog.cancel();
    };
}
