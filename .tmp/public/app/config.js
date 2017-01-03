var api_base_url="http://158.85.67.166:9003/";

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
'service'
]);

angular.module('zenbrisa.controllers',[]);
angular.module('zenbrisa.public.Controller',[]);
angular.module('zenbrisa.app',[]);



var API_URL=
{
	
	"login":api_base_url+"users/userLogin",
	"signup":api_base_url+"users/signup1"
}
