var api_base_url="http://158.85.67.166:9003/";
//var api_base_url="http://100.100.7.165:9002/";
var api_image_url="http://zenbrisa.com:9002/";
//var api_base_url="http://localhost:9003/";
var local_api_url="/services/";

angular.module('zenbrisa',
[
'ngMaterial',
'ngMessages',
'app.ngRoute',
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
'cl.paging',
'userDashboardModule',
'userDashboardSearchModule',
'userLocationsModule',
'userPhotoGalleryModule',
'userPollModule',
'ame.lightbox',
'filevalidate',
'zenbrisa.blog',
'zenbrisa.userProfile'
]);

angular.module('zenbrisa.app',[]);
angular.module('zenbrisa.controllers',[]);
angular.module('zenbrisa.public.Controller',[]);
angular.module('userDashboardModule',[]);
angular.module('userDashboardSearchModule',[]);
angular.module('userPhotoGalleryModule',[]);
angular.module('userLocationsModule',[]);
angular.module('userPollModule',[]);
angular.module('zenbrisa.blog',[]);
angular.module('zenbrisa.userProfile',[]);

var API_URL=
{
	
	"login":api_base_url+"users/userLogin",
	"signup":api_base_url+"phase2/quickSignUp",
	"forgetPassword":api_base_url+'users/forgotPassword',
	"contactusMail":api_base_url+"users/contactusMail",
	"search":api_base_url+"search",
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
	"requestPhotoKey":api_base_url+'requests/sendRequest'

}
