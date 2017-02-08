angular.module('zenbrisa.mailbox')
.controller('draftCtrl', ['mailBoxSvr', 'appServices', '$rootScope', '$timeout',
	function (mailBoxSvr, appServices, $rootScope, $timeout) {
		var vm = this;
		vm.isloading = true;
		vm.currentNavItem = 'draft';
		vm.goto = mailBoxSvr.goto;

		// Load Draft items
		var page = 1, limit = 50;

		// Load draft items
		function loadDraftMails(query) {
			var userId = $rootScope.isUserLogin.userId;
			var query = !angular.isUndefined(query) ? '?q='+query : '';
			appServices.post(API_URL.getUsers + query, {senderId: userId, type: 'draft'}, function (response) {
				vm.isloading = false;
				if(response.status === 1){
					vm.datalist = response.data;
					vm.getMailConversation(vm.datalist[0].userId, 0);
				} else {
					vm.errormsg = response.messages;
				}
			});
		}
		loadDraftMails();

		// get the mails
		vm.getMailConversation = function (senderId, $index) {
			var receiverId = $rootScope.isUserLogin.userId;
			vm.conversationName = vm.datalist[$index].username;
			request = {senderId: senderId, receiverId: receiverId, page: page, limit: limit, type: 'draft'};
			appServices.post(API_URL.mailConversationsById, request, function (response) {
				if(response.status === 1){
					vm.conversations = response.data;
					$timeout(function () {
						$('.chatCon').animate({scrollTop: $('.chatCon').prop('scrollHeight')}, 'slow');	
					}, 500);
					
				} else {
					vm.error = response.messages;
				}
			});
		};

		vm.checkReceived = function (receiverId) {
			return $rootScope.isUserLogin.userId != receiverId;
		};

		vm.searchUser = function (query) {
			loadDraftMails(query);
		};
	}
]);