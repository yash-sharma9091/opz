/*
	name : public controller
	function : login, signup, modal 
*/

angular.module('zenbrisa.public.Controller',[]).
controller('loginCtrl', loginCtrl);
loginCtrl.$inject=['$scope','$mdDialog'];

function loginCtrl(e,mdDialog,appServices)
{
	e.cancel = function() 
	{
    	  mdDialog.cancel();
    };


    

}