angular.module('zenbrisa.mailbox')
.controller('mailFolderCtrl', ['appServices', 'mailBoxSvr', 
	function (appServices, mailBoxSvr) {
		var vm = this;
		vm.isloading = true;
		vm.currentNavItem = 'myfolder';
		vm.goto = mailBoxSvr.goto;

		// Load user folders
		appServices.post(API_URL.getUserFolders,{},function (response) {
			vm.isloading = false;
			if(response.status === 1){
				vm.datalist = response.data;
				console.log(vm.datalist);
			} else {
				vm.errormsg = response.messages;
			}
		});
	}
]);