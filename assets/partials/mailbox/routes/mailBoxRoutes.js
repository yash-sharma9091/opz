angular.module('app.mailBoxRoute',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/mailbox', {
		templateUrl:"/partials/mailbox/views/mailbox.html",
		controllerAs: 'vm',
		controller:"mailboxCtrl",
    	access: { login:true }
	}).when('/sentmail', {
		templateUrl:"/partials/mailbox/views/mailbox.html",
		controllerAs: 'vm',
		controller:"sentmailCtrl",
    	access: { login:true }
	}).when('/draft', {
		templateUrl:"/partials/mailbox/views/mailbox.html",
		controllerAs: 'vm',
		controller:"draftCtrl",
    	access: { login:true }
	}).when('/trash', {
		templateUrl:"/partials/mailbox/views/mailbox.html",
		controllerAs: 'vm',
		controller:"trashCtrl",
    	access: { login:true }
	}).when('/myfolder', {
		templateUrl:"/partials/mailbox/views/userfolders.html",
		controllerAs: 'vm',
		controller:"mailFolderCtrl",
    	access: { login:true }
	})
}]);