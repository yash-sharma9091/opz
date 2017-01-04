angular.module('service',['ngMaterial'])
.factory('appServices', function($mdDialog,$http,localStorageService,$templateCache){
	var service={};

	service.modal=function(template, controller,ev)
	{
		$mdDialog.show({
			controller: controller,
			templateUrl:template ,
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:false,
			disableParentScroll:true
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

		var token;
		
		if(sessionStorage['ls.user'])
		{
			token=JSON.parse(sessionStorage['ls.user']).token;
		}
		if(localStorage['ls.user'])
		{
			token=JSON.parse(localStorage['ls.user']).token;
		}
		if(token)
		{
		    $http.defaults.headers.common['user-token'] = token;
	        $http.defaults.headers.common['user-role'] = "user";
        }
        
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
	};

	
	service.getCountry= function(callback){

		var $request={
			method:'GET',
			url:local_api_url+'country.json',
			cache:$templateCache
		
		};

		$http($request).then(success);
		function success(reponse)
		{
			callback(reponse.data);
		}

	};

	return service;
});



function getAge(dateString)
{
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = (today.getMonth()+1)-(birthDate.getMonth()+1);
  var data={};
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
      m=12-1;
  }
 data["age"]=age;

  if(m!=0)
  {
    data["month"]=m;
  }
  return data;
}

function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }
