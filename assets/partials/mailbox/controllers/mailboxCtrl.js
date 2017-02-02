angular.module('zenbrisa.mailbox')
.controller('mailboxCtrl', ['mailBoxSvr', 
	function (mailBoxSvr) {
		var vm = this;
		vm.isloading = true;
		vm.currentNavItem = 'mailbox';
		vm.goto = mailBoxSvr.goto;

		// Load inbox items
		mailBoxSvr.get('inbox', function (response) {
			vm.isloading = false;
			if(response.status === 1){
				vm.datalist = response.data;
			} else {
				vm.errormsg = response.messages;
			}
		});
	}
]);