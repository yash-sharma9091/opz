var api_base_url="http://158.85.67.166:9003/";
var api_base_url="http://localhost:9003/";
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
'cl.paging'
]);

angular.module('zenbrisa.controllers',[]);
angular.module('zenbrisa.public.Controller',[]);
angular.module('zenbrisa.app',[]);



var API_URL=
{
	
	"login":api_base_url+"users/userLogin",
	"signup":api_base_url+"phase2/quickSignUp",
	"forgetPassword":api_base_url+'users/forgotPassword',
	"contactusMail":api_base_url+"users/contactusMail",
	"search":api_base_url+"search"
}
