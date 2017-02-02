angular.module('zenbrisa.mailbox')
.controller('trashCtrl', ['mailBoxSvr', 
	function (mailBoxSvr) {
		var vm = this;
		vm.isloading = true;
		vm.currentNavItem = 'trash';
		vm.goto = mailBoxSvr.goto;

		// Load trash items
		mailBoxSvr.get('trash', function (response) {
			vm.isloading = false;
			if(response.status === 1){
				vm.datalist = response.data;
			} else {
				vm.errormsg = response.messages;
			}
		});
	}
]);