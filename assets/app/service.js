angular.module('service',['ngMaterial'])
.factory('appServices', function($mdDialog){
	var service={};
	service.modal=function(template, controller,ev){
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

	service.post= function(url,data, callback)
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


	}
	return service;
});
