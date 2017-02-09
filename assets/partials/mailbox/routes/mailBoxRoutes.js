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
}])
.run(['$rootScope', 'appServices', function ($rootScope, appServices) {
	$rootScope.camposeMailBoxEmail=function(event) {
		console.log($rootScope.userprofile.username);
		var data={};
		data.id=$rootScope.isUserLogin.userId;
		data.username=$rootScope.userprofile.username;
		data.user=$rootScope.isUserLogin;
		appServices.modal('partials/mailbox/partials/compose-email.html', composeMailboxEmailCtrl, event, data);
	}
}]);

function composeMailboxEmailCtrl($scope, $mdDialog, appServices, Upload, data) {
	$scope.email={};
	$scope.selectedUserId=null;
	$scope.entryId = undefined;
	$scope.selectedItemChange = function (item) {
		$scope.selectedUserId = item.id;
	};

	$scope.shootMail = function (isValid, email) {
		if(!isValid){
			return;
		}
	  	if(email){
	  		var request = {
	  			entryId: $scope.entryId,
	  			mailStatus: 'sent',
	  			receiverId: email.selectedUser.id,
	  			senderName: data.username
	  		};
		  	appServices.post(API_URL.updateMailStatus,{request:request}, function(response) {
	        	if(response.status == 1){
	        		$scope.alert={'message':response.message,'type':'alert-danger'};   
                    $scope.send=true;
	        	} else {
	        		$scope.alert={'message':response.data.message || 'Error','type':'alert-danger'};
	        	}
	        });
	  	}	  	
	};

	$scope.saveToDraft = function(email, file) {
		if(email) {
			$scope.saving = 'Saving ...';
			Upload.upload({
  		        url: API_URL.saveMail,
  		        data: {
  		        	attachments: file,
  		        	'composeTo': email.selectedUser.email,
  		        	'composeSubject': email.composeSubject,
  		        	'composeMessage': email.composeMessage,
  		        	'receiverId': email.selectedUser.id,
  		        	'replyMailStatus': 'draft',
  		        	'entryId': $scope.entryId
  		        }
  		    }).then(function(response){
  		    	$scope.saving = null;
  		    	if( response.data.status == 1 ){
  		    		if(!angular.isArray(response.data.data)){
  		    			$scope.entryId = response.data.data.id;
  		    		}
  		    	}
  		    }, function(response){
  		    	$scope.alert={'message':response.data.message || 'Error','type':'alert-danger'};
  		    });
		}
	};

	$scope.saveMail = function (isValid, email) {
		if(!isValid){
			return;
		}
	  	//in prevoius api data send using from data method 
	  	if(email){
		  	
	  	}
	  	
	};

	$scope.cancel = function () {
		$mdDialog.cancel();
	};

	$scope.querySearch = function (searchText) {
		return appServices.search(API_URL.getSearchUsers, {request: {'nameOfUser': searchText}})
		.then(function (response) {
			return response.data.data;
		});
	};

	$scope.generateKey = function(key, receiverId)
	{
		if(key) {
			$scope.generatingKey = true;
	        var promise={ objectUserId: receiverId };
	        appServices.post(API_URL.generateKey,promise, function(response) {
	        	$scope.generatingKey = false;
	            if(response.status==1) {
	                $scope.email['photokey']= response.data.photokey;
	                $scope.email['composeMessage'] += response.data.composeMessage;
	                $scope.saveToDraft($scope.email);
	            }
	        });
	  	} else {
			delete $scope.email['photokey'];
	  	}
	};

	$scope.onAttachmentSelected = function(file, email){
		$scope.saveToDraft(email, file);
	};
}