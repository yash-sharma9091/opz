var api_base_url="http://158.85.67.166:9003/";
//var api_base_url="http://100.100.7.165:9002/";
var api_image_url="http://zenbrisa.com:9002/";
//var api_base_url="http://localhost:9003/";
var local_api_url="/services/";
var baseurl='http://localhost:3002/';
angular.module('zenbrisa',
[
'ngMaterial',
'ngMessages',
'app.ngRoute',
'app.mailBoxRoute',
'ngSanitize',
'rzModule',
'ngAnimate',
'LocalStorageModule',
'ui.bootstrap',
'zenbrisa.app',
'zenbrisa.controllers',
'zenbrisa.public.Controller',
'angular-loading-bar',
'app.direcrives',
'service',
'ngMap',
'zenbrisa.userProfile',
'cl.paging',
'userDashboardModule',
'userDashboardSearchModule',
'userLocationsModule',
'userPhotoGalleryModule',
'userPollModule',
'ame.lightbox',
'filevalidate',
'zenbrisa.blog',
'zenbrisa.blogComment',
'angularUtils.directives.dirPagination',
'textAngular',
'ngAria',
'youtube-embed',
'ngImgCrop',
'ngFileUpload',
'zenbrisa.mailbox',
"socialLogin"

]);

angular.module('zenbrisa.userProfile',[]);
angular.module('zenbrisa.app',[]);
angular.module('zenbrisa.controllers',[]);
angular.module('zenbrisa.public.Controller',[]);
angular.module('userDashboardModule',[]);
angular.module('userDashboardSearchModule',[]);
angular.module('userPhotoGalleryModule',[]);
angular.module('userLocationsModule',[]);
angular.module('userPollModule',[]);
angular.module('zenbrisa.blog',[]);
angular.module('zenbrisa.blogComment',[]);
angular.module('zenbrisa.mailbox',[]);
angular.module('socialLogin',[]);


var API_URL=
{
	
	"login":api_base_url+"users/userLogin",
	"signup":api_base_url+"phase2/quickSignUp",
	"forgetPassword":api_base_url+'users/forgotPassword',
	"contactusMail":api_base_url+"users/contactusMail",
	// "search":api_base_url+"search",
	"search":api_base_url+"SearchResultsPhase2/countrySearch",
	"searchCount":api_base_url+"SearchResultsPhase2/countrySearchCount",
	"userprofileStepNew": api_base_url+ 'users/getUserInfo' ,
	"getSetting": api_base_url+ 'userSettings/getUserSettings',  
	"updateSetting":api_base_url+ 'userSettings/updateUserSettings',
	"updatePassword":api_base_url+ 'users/changePassword',
	"DeleteUserAccount": api_base_url+ 'users/checkPassword',
	"deleteUserAccountData": api_base_url+'users/deleteAMember',
	"getfavourite": api_base_url+'users/getAllFavourite',
	"removefavourite": api_base_url+'users/makeUnFavourite',
	"getblockUser": api_base_url+'users/getBlockedUsers',
	"removeBlockuser": api_base_url+'users/unblockAUser',
	"logout": api_base_url+'users/userLogout',
	"getMyPennedReview":api_base_url+'users/getMyPennedReviews',
	"getReviews":api_base_url+'users/getMyReceivedReviews',
	"getUserVideo":api_base_url+'users/getVideosByUserId',
	"removeVideoById":api_base_url+'users/deleteVideo',
	"AddUserVideo":api_base_url+'users/addVideo',
	"getTravelCities":api_base_url+"travelLocations/getTravelCities",

	"getUserphoto":api_base_url+'users/getMyPhotos',
	"deleteMyPhoto":api_base_url+ 'users/deletePhoto',
	"setProfilePic":api_base_url+'users/makeProfilePicture',
	//"uploadPhoto": api_base_url+'users/uploadPhoto'
	"uploadPhoto": api_base_url+'users/addPhoto',
	"checkuserName":api_base_url+'phase2/checkUsername',
	
	"getPoll":api_base_url+'userpoll/getRecentPoll',
	"getTravelLocations" : api_base_url+"travelLocations/getTravelLocations",
	
	"addPoll": api_base_url + "userpoll/addpoll",
	"checkPoll":api_base_url+ "userpoll/checkPollAttended",
	"submitPoll":api_base_url+ "userpoll/answerpoll",
	"getPollPercentage": api_base_url+'userpoll/pollAnswerPercentage',
	"pollComment": api_base_url+'userpoll/getpollcomments',
	"allPoll":api_base_url+'userpoll/getpolls',
	"referFriend":api_base_url+'users/referFriend',
	"getMyBonusHistory":api_base_url+'subscription/getMyBonusHistory',

	"blogList":api_base_url+ 'blog/getBlogList',
	"getSingleBlog" : api_base_url+"blog/getBlogDetails",
	"uploadImage" : api_base_url+"blog/uploadImage",
	"addBlog" : api_base_url+"blog/addBlog",
	"getTravelLocations" : api_base_url+"travelLocations/getTravelLocations",
	"updateLocationCategory" : api_base_url+"travelLocations/updateLocationCategory",
	"updateLocationPrimary" : api_base_url+"travelLocations/updateLocationPrimary",
	"saveMyLocation" : api_base_url+"travelLocations/saveMyLocation",
	"deleteTravelLocation" : api_base_url+"travelLocations/deleteTravelLocation",
	"checkTravelCityPresent" : api_base_url+"travelLocations/checkTravelCityPresent",
	"addTravelLocation" : api_base_url+"travelLocations/addTravelLocation",

	"getOtherUserProfile":api_base_url+'users/getOtherUserDetails',
	"getReviewsOther":api_base_url+'users/getOtherReceivedReviews',
	"reviewsPennedOtherprofile":api_base_url+'users/getOtherPennedReviews',
	"addTofav":api_base_url+'users/addToFavourite',
	"removeTofav":api_base_url+'users/makeUnFavourite',
	"getAllCountOtherprofile":api_base_url+'users/getAllCountOtherprofile',
	"blockuser" :api_base_url+ 'users/blockAUser',
	"unblockAUser" :api_base_url+ 'users/unblockAUser',
	"getPublicPhoto":api_base_url+'users/getPublicPhotos',
	"checkPhotoKey":api_base_url+'users/getPrivatePhotos',
	"requestPhotoKey":api_base_url+'requests/sendRequest',
	"getAllCountMyprofile":api_base_url+ 'users/getAllCountProfile',
	"generateKey":api_base_url+ 'users/generatePhotoKeyMerge',
	"reportAbuse":api_base_url+'users/addReport',
	"addPrivateNote":api_base_url+'privateNotes/getPrivateNotes',
	"writePrivateNote":api_base_url+'privateNotes/writePrivateNotes',
	"setProfilePic" : api_base_url+'users/cropProfileImage',
	"checkReviewWrite" :api_base_url+"users/checkReview",
	
	//social login/signup
	"socialLoginUrl": api_base_url+'phase2/socialLoginSignup',

	//email system
	"saveMail":api_base_url+'mail/saveMail',
	"addReview":api_base_url+'users/addReview',

	// blog commnet
	"addBlogComment": api_base_url+'blog/addBlogComment',
	"getBlogcommentList": api_base_url+'blog/getBlogcommentList',

	// mailbox
	"mailbox": api_base_url + 'mail/mailbox',
	"getUserFolders": api_base_url + 'mail/getUserFolders',
	"mailConversationsById": api_base_url + 'mailBox/mailConversationsById',
	"getUsers": api_base_url + 'mailBox/getUsers',

	//add massage
	"addMassage":api_base_url+"massagenow/addMassageNow",
	"getMassage": api_base_url+"massagenow/getMassageNowDetails"
}
