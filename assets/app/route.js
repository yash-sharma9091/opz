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
    controller:"homepage",
    templateUrl:"/partials/static-pages/free-massage-exchange/free-massage-exchange.html",
    access:
    {
          login:false
    }
  }).when('/gay-massage',{
    controller:"homepage",
    templateUrl:"/partials/static-pages/gay-massage/gay-massage.html",
    access:
    {
          login:false
    }
  }).when('/paid-professional-massage',{
    controller:"homepage",
    templateUrl:"/partials/static-pages/paid-professional-massage/paid-professional-massage.html",
    access:
    {
          login:false
    }
  }).when('/sensual-massage',{
    controller:"homepage",
    templateUrl:"/partials/static-pages/sensual-massage/sensual-massage.html",
    access:
    {
          login:false
    }
  })
  .when('/therapeutic-massage',{
    controller:"homepage",
    templateUrl:"/partials/static-pages/therapeutic-massage/therapeutic-massage.html",
    access:
    {
          login:false
    }
  })
  .when('/advertise',{
    controller:"homepage",
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
  .when('/search-page',
    {
    templateUrl:"/partials/dashboard/user-home.html",
    controller:'userDashboardSearch',
    access:
    {
          login:true
    }
  })
  .when('/profile',
    {
    templateUrl:"/partials/dashboard/userProfile/myProfile.html",
    //path:-- assets/app.js 
    access:
    {
          login:false
    }
  })
  .when('/profile/:_id',
    {
    templateUrl:"/partials/dashboard/userProfile/myProfile.html",
    controller:'userProfileView',
    access:
    {
          login:false
    }
  })

  .when('/my-locations',
    {
    templateUrl:"/partials/dashboard/locations/my-locations.html",
    controller:'userLocations',
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
  .when('/setting',
    {
    templateUrl:"/partials/dashboard/setting/setting.html",
    controller:"userDashboard",
    
    access:
    { 
          login:true
    }
  })
   .when('/my-favourites',
    {
    templateUrl:"/partials/dashboard/favorites/favorites.html",
    controller:"MyFavourites",
    //controller path file path : assest/dashboard/dashboard.js
    access:
    { 
          login:true
    }
  })
    .when('/blocked-userlist',
    {
    templateUrl:"/partials/dashboard/blockedUsers/blockedusers.html",
    controller:"blockedusers",
    //controller path file path : assest/dashboard/dashboard.js
    access:
    { 
          login:true
    }
  })
  .when('/reviews-penned',
    {
    templateUrl:"/partials/dashboard/reviews/review-pinned.html",
    controller:"userReviewPined",
    //controller path file path : assest/dashboard/dashboard.js
    access:
    { 
          login:false
    }
  })
   .when('/reviews-penned/:_id',
    {
    templateUrl:"/partials/dashboard/reviews/review-pinned.html",
    controller:"userProfileView",
    //controller path file path : assest/dashboard/userprofile.js
    access:
    { 
          login:false
    }

  })

   .when('/reviews-received',
    {
    templateUrl:"/partials/dashboard/reviews/review-received.html",
    controller:"userReviewReceived",
    //controller path file path : assest/dashboard/dashboard.js
    access:
    { 
          login:false
    }

  })
   .when('/reviews-received/:_id',
    {
    templateUrl:"/partials/dashboard/reviews/review-received.html",
    controller:"userProfileView",
    //controller path file path : assest/dashboard/userprofile.js
    access:
    { 
          login:false
    }

  })
   .when('/write-reviews/:_id',
    {
    templateUrl:"/partials/dashboard/reviews/write-review.html",
    controller:"userProfileView",
    //controller path file path : assest/dashboard/userprofile.js
    access:
    { 
          login:false
    }

  })
   .when('/my-video',
    {
    templateUrl:"/partials/dashboard/my-vedio/my-vedio.html",
    controller:"myVedio",
    //controller path file path : assest/dashboard/dashboard.js
    access:
    { 
          login:true
    }
  })
   //user profile view public
   .when('/my-video/:_id',
    {
    templateUrl:"/partials/dashboard/my-vedio/my-vedio.html",
    controller:"userProfileView",
    //controller path file path : assest/dashboard/userProfileView.js
    access:
    { 
          login:false
    }
  })

   //user profile public on search or view
    .when('/photo-gallery/:id',
    {
    templateUrl:"/partials/dashboard/photoGallery/photo-gallery.html",
    controller:"photoGallery",
    //controller path file path : assest/dashboard/photogallery.js
    access:
    { 
          login:true
    }
  })
    .when('/photo-gallery/:id/:_id',
    {
    templateUrl:"/partials/dashboard/photoGallery/other-photo-gallery.html",
    controller:"userProfileView",
    //controller path file path : assest/dashboard/userProfileView.js
    access:
    { 
          login:false
    }
  })
     .when('/photo-gallery/',
    {
    templateUrl:"/partials/dashboard/photoGallery/photo-gallery.html",
    controller:"photoGallery",
    //controller path file path : assest/dashboard/photogallery.js
    access:
    { 
          login:true
    }
  })
  .when('/my-poll',
  {
    templateUrl:"/partials/dashboard/userPoll/user-poll.html",
    controller:"userPoll",
    //controller path file path : assest/dashboard/user-poll.js
    access:
    { 
          login:true
    }
  })
  .when('/create-poll',
  {
    templateUrl:"/partials/dashboard/userPoll/submit-poll.html",
    controller:"userPoll",
    //controller path file path : assest/dashboard/user-poll.js
    access:
    { 
          login:true
    }
  })
  .when('/all-poll',
  {
    templateUrl:"/partials/dashboard/userPoll/all-poll.html",
    controller:"allPoll",
    //controller path file path : assest/dashboard/user-poll.js
    access:
    { 
          login:true
    }
  })
  .when('/poll-details/:id',
  {
    templateUrl:"/partials/dashboard/userPoll/poll-details.html",
    controller:"allPoll",
    //controller path file path : assest/dashboard/user-poll.js
    access:
    { 
          login:true
    }
  })
.when('/refer-friend',
  {
    templateUrl:"/partials/dashboard/refer/refer.html",
    controller:"refer",
    //controller path file path : assest/dashboard/user-poll.js
    access:
    { 
          login:true
    }
  })
.when('/bonus-history',
  {
    templateUrl:"/partials/dashboard/refer/bonus-history.html",
    controller:"refer",
    //controller path file path : assest/dashboard/user-poll.js
    access:
    { 
          login:true
    }
  })
.when('/blogs',
  {
    templateUrl:"/partials/blog/blogList.html",
    controller:"blog",
    //controller path file path : assest/blog/blog.js
    access:
    { 
          login:false
    }
  })
.when('/blog/:blogId/:slug',
  {
    templateUrl:"/partials/blog/single.html",
    controller:"blog",
    //controller path file path : assest/blog/blog.js
    access:
    { 
          login:false
    }
  })
.when('/blog/post-a-blog',
  {
    templateUrl:"/partials/blog/post.html",
    controller:"blog",
    //controller path file path : assest/blog/blog.js
    access:
    { 
          login:true
    }
  })

    .when('/404',{
    templateUrl: function(){
      location.assign('/404');
    }
  })
  .otherwise({redirectTo:"/404"});
}]);
