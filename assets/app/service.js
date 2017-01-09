angular.module('service',['ngMaterial'])
.factory('appServices', function($mdDialog,$http,localStorageService,$templateCache,$mdDialog){
	var service={};

	service.milesList = function(){
		var miles = [
	                    {"hideValue" : 0, "displayValue" : "--Select within miles--"},
	                    {"hideValue" : 5, "displayValue" : "Within 5 miles (8 KM)"},
	                    {"hideValue" : 10, "displayValue" : "Within 10 miles (16 km)"},
	                    {"hideValue" : 20, "displayValue" : "Within 20 miles (32 km)"},
	                    {"hideValue" : 30, "displayValue" : "Within 30 miles (48 km)"},
	                    {"hideValue" : 40, "displayValue" : "Within 40 miles (64 km)"},
	                    {"hideValue" : 50, "displayValue" : "Within 50 miles (80 km)"},
	                    {"hideValue" : 60, "displayValue" : "Within 60 miles (97 km)"},
	                    {"hideValue" : 70, "displayValue" : "Within 70 miles (113 km)"},
	                    {"hideValue" : 80, "displayValue" : "Within 80 miles (129 km)"},
	                    {"hideValue" : 90, "displayValue" : "Within 90 miles (145 km)"},
	                    {"hideValue" : 100, "displayValue" : "Within 100 miles (161 km)"},
	                    {"hideValue" : 150, "displayValue" : "Within 150 miles (241 km)"},
	                    {"hideValue" : 200, "displayValue" : "Within 200 miles (322 km)"},
	                    {"hideValue" : 300, "displayValue" : "Within 300 miles (483 km)"},
	                    {"hideValue" : 400, "displayValue" : "Within 400 miles (644 km)"},
	                    {"hideValue" : 500, "displayValue" : "Within 500 miles (805 km)"},
	                    {"hideValue" : 1000, "displayValue" : "Within 1000 miles (1609 km)"},
	                    {"hideValue" : "countrywide", "displayValue" : "Country-wide"}
	                ];
	    return miles;
	}

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
	service.openAlertBox= function(title,message,theme){
	
     var alert=$mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(false)
        .title(title)
        .htmlContent(message)
        .ariaLabel('Alert Dialog')
        .ok('Ok')
        .theme(theme);

  $mdDialog.show(alert);

  }

  service.confirmAlert= function(title,message,theme,btnyes, btnno){
	
		var confirm = $mdDialog.confirm()
		  .title(title)
          .textContent(message)
          .ariaLabel('confirm')
          .ok(btnyes)
          .cancel(btnno);

          return confirm;


  };
    service.loader= function(message){
	
		var loader = $mdDialog.alert()
          .textContent(message)
          .ariaLabel('loader')
          .ok("ok")
          .theme('loader')

           $mdDialog.show(loader);


  }

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
