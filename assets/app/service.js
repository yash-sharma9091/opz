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
	}
	return service;
});
