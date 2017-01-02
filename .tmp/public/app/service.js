angular.module('service',['ngMaterial'])
.factory('appServices', function($mdDialog,$http,localStorageService){
	var service={};

	service.modal=function(template, controller,ev)
	{
		$mdDialog.show({
			controller: controller,
			templateUrl:template ,
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true
		})
		.then(function(answer) {
         // $scope.status = 'You said the information was "' + answer + '".';
     }, function() {
         // $scope.status = 'You cancelled the dialog.';
     });
	};

	service.post=function(url,data, callback)
	{
		var $request={
			method:'POST',
			url:url,
			data:data
		};

		$http($request).then(success, error);

		function success(response){
			callback(response.data);
		};

		function error(response){
			callback(response);
		};


	};
	service.checkStorage= function(key){
		if (localStorageService.get(key,"sessionStorage")){
			return localStorageService.get(key,"sessionStorage");
		}
		else if (localStorageService.get(key,"localStorage")){
			return localStorageService.get(key,"localStorage");
		}
		else
			return false;
	};
	service.sessionStorage=function(key,data){
		
		localStorageService.set(key, data, "localStorage");
	};
	service.getSessionStorage=function(key){
		
		localStorageService.get(key,"localStorage");
	};
	service.logout=function(key)
	{
		
		Object.keys(sessionStorage).filter(function(key){
				sessionStorage.removeItem(key)
		});
		Object.keys(localStorage).filter(function(key){
			localStorage.removeItem(key)
		});
		return true;
	}

	return service;
});
