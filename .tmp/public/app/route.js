angular.module('app.ngRoute',['ngRoute'])
//define route and location
.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/',
	{
		controller:"homepage",
		templateUrl:"/partials/home/home.html",
    access:
    {
          login:false
    }
	}).when('/about-us',{
  	templateUrl:"/partials/static-pages/about-us/about-us.html",
    access:
    {
          login:false
    }
  })
  .when('/faqs',{
  	templateUrl:"/partials/static-pages/faqs/faqs.html",
    access:
    {
          login:false
    }
  })
  .when('/term-of-use',{
    templateUrl:"/partials/static-pages/term-of-use/term-of-use.html",
    access:
    {
          login:false
    }
  })
  .when('/privacy',{
    templateUrl:"/partials/static-pages/privacy/privacy.html",
    access:
    {
          login:false
    }
  })
  .when('/free-massage-exchange',{
    templateUrl:"/partials/static-pages/free-massage-exchange/free-massage-exchange.html",
    access:
    {
          login:false
    }
  }).when('/gay-massage',{
    templateUrl:"/partials/static-pages/gay-massage/gay-massage.html",
    access:
    {
          login:false
    }
  }).when('/paid-professional-massage',{
    templateUrl:"/partials/static-pages/paid-professional-massage/paid-professional-massage.html",
    access:
    {
          login:false
    }
  }).when('/sensual-massage',{
    templateUrl:"/partials/static-pages/sensual-massage/sensual-massage.html",
    access:
    {
          login:false
    }
  })
  .when('/therapeutic-massage',{
    templateUrl:"/partials/static-pages/therapeutic-massage/therapeutic-massage.html",
    access:
    {
          login:false
    }
  })
  .when('/advertise',{
    templateUrl:"/partials/static-pages/advertise/advertise.html",
    access:
    {
          login:false
    }
  })
  .when('/contactus',{
    templateUrl:"/partials/static-pages/contactus/contactus.html",
    controller:'contactus',
    access:
    {
          login:false
    }
  })
  //dynamic page login require
  .when('/home',
    {
    templateUrl:"/partials/dashboard/user-home.html",
    access:
    {
          login:true
    }
  })
  .when('/my-profile',
    {
    templateUrl:"/partials/dashboard/my-profile.html",
    access:
    {
          login:true
    }
  })
  .when('/search',
    {
    templateUrl:"/partials/global-search/search.html",
    controller:"homepage",
    access:
    { 
          login:false
    }
  })
    .when('/404',{
    templateUrl: function(){
      location.assign('/404');
    }
  })
  .otherwise({redirectTo:"/404"});
}]);
