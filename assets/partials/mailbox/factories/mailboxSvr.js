angular.module('zenbrisa.mailbox')
.factory('mailBoxSvr', ['$window', 'appServices', function($window, appServices) {
    return {
        goto: function(href) {
        	$window.location.href = '#/' + href;
        },
        get: function (type, cb) {
        	appServices.post(API_URL.mailbox,{request : {box: type}},cb);
        }
    };
}]);