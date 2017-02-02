angular.module('zenbrisa.mailbox')
.controller('draftCtrl', ['mailBoxSvr', 
	function (mailBoxSvr) {
		var vm = this;
		vm.isloading = true;
		vm.currentNavItem = 'draft';
		vm.goto = mailBoxSvr.goto;

		// Load Draft items
		mailBoxSvr.get('draft', function (response) {
			vm.isloading = false;
			if(response.status === 1){
				vm.datalist = response.data;
			} else {
				vm.errormsg = response.messages;
			}
		});
	}
]);