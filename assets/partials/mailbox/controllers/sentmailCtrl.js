angular.module('zenbrisa.mailbox')
.controller('sentmailCtrl', ['mailBoxSvr', 
	function (mailBoxSvr) {
		var vm = this;
		vm.isloading = true;
		vm.currentNavItem = 'sentmail';
		vm.goto = mailBoxSvr.goto;

		// Load sent items
		mailBoxSvr.get('sent', function (response) {
			vm.isloading = false;
			if(response.status === 1){
				vm.datalist = response.data;
			} else {
				vm.errormsg = response.messages;
			}
		});
	}
]);