angular.module('userLocationsModule',[]).controller('userLocations', userLocations);

userLocations.$inject=['$scope', '$rootScope','appServices','$location'];

function userLocations(e, rootscope, appServices, $location)
{	
	e.commonMilesArray = appServices.milesList();

	e.getdate=function()
	{
		return new Date();
	}

	e.getSavedLocations = function(){
		var data = {};
		appServices.post(API_URL.getTravelLocations, data, function(response)
	     {
	     	
	     	/*Get Current User Saved Locations*/
	     	if(response.status == 1){
	     		/*If Response is not empty*/
	     		e.myLocations = response.data;
	     	}
		});
	}

	e.locationCategoryChange  = function (myLocationId, locationCategory, event){
           e.primaryDisable = false;
           switchKey = event.currentTarget.id;
           console.log(switchKey)
           switch(switchKey){
               case 'locationCategoryHomeCountry' :
                       appServices.alert("You can only select a CITY as a Home or Travel location, not a state or country");
                       event.currentTarget.checked = false;
                       return;

               break;

               case 'locationCategoryTravelCountry' :

                       appServices.alert("You can only select a CITY as a Home or Travel location, not a state or country");
                       event.currentTarget.checked = false;
                       return;

               break;

               case 'locationCategoryTravel' :
                       var locationCategory = "travel";
                        for(var i=0; i< e.myLocations.length; i++){
                                if(e.myLocations[i].id == myLocationId && e.myLocations[i].primaryLocation == 'primary'){
                                        appServices.alert("Your PRIMARY Home CANNOT be Travel City");
                                        
                                        event.currentTarget.checked = false;
                                        e.myLocations[i].checked = false;
                                        return;

                                }
                                else if(e.myLocations[i].id == myLocationId && e.myLocations[i].primaryLocation == 'primary' && e.myLocations[i].locationCategory == 'home'){
                                        appServices.alert("Your PRIMARY Home CANNOT be Travel City");
                                        event.currentTarget.checked = false;
                                        return;                                  
                                }
                                else if(e.myLocations[i].id == myLocationId && e.myLocations[i].locationCategory == 'home'){
                                      request = {id: myLocationId, locationCategory: locationCategory};
                                      appServices.post(API_URL.updateLocationCategory,{request: request},function(response){
						                	if (response.status == 1){
						                		e.getSavedLocations();
						                	}else{
						                		appServices.alert("Please Try Again");
						                		return;
						                	}
						                });
                                }
                        }
		        break;

		        case 'locationCategoryHome' :
		                var locationCategory = "home";
		                request = {id: myLocationId, locationCategory: locationCategory};
		                
		                appServices.post(API_URL.updateLocationCategory,{request: request},function(response){
		                	if (response.status == 1){
		                		e.getSavedLocations();
		                	}else{
		                		appServices.alert("Please Try Again");
		                		return;
		                	}
		                });
		        break;
		    }
		}


		e.locationPrimaryChange  = function (myLocationId, locationPrimary, event){

             if(event.currentTarget.id == "locationPrimaryCountry"){
             	  event.currentTarget.checked = false;
                  appServices.alert("You can only select a CITY as a Primary location, not a state or country");        
                  console.log(event.currentTarget)
                  event.currentTarget.checked = false;
                  return;

              }
              else{
                 for(var i=0; i< e.myLocations.length; i++){
                    if(e.myLocations[i].id == myLocationId && e.myLocations[i].locationCategory == 'travel'){
                    		event.currentTarget.checked = false;
                            appServices.alert("Your Travel City CANNOT be Primary Home");
                            console.log(event.currentTarget)
                            return;
                    }
                    else if(e.myLocations[i].id == myLocationId && e.myLocations[i].locationCategory == 'home'){
                            for(var i=0; i< e.myLocations.length; i++){
                              if(e.myLocations[i].id == myLocationId){
                                   e.myLocations[i].primaryLocation = "primary";
                               }
                               else{
                                   e.myLocations[i].primaryLocation = "";
                               }
                            }

                        request = {id: myLocationId};
                        appServices.post(API_URL.updateLocationPrimary,{request: request}, function(response){
                        	if (response.status == 1){
                        		e.getSavedLocations();
                        	}else{
                        		appServices.alert("Please Try Again");
    							return;
                        	}
                        });
                    }

                }

             }

        }

        e.mylocationsSave  = function ($index){
        //e.myLocations[$index].travelStart = 
        var date_1st = e.myLocations[$index].travelStart;
        var date_2nd = e.myLocations[$index].travelEnd;

               if(e.myLocations[$index].locationCategory == 'travel'){
                       if(!date_1st && !date_2nd){
                            var alertErrMsg = "Please select search Dates";
                            var errorResponse={status:false, type: 'danger',message: alertErrMsg};
                            e.myLocations[$index].travelStart    = "";
                            e.myLocations[$index].travelEnd      = "";
                            appServices.alert(alertErrMsg);
                            return false;
                      }
                      else if(!date_1st && date_2nd){
                            var alertErrMsg = "Please Select travelStart Date";
                            var errorResponse={status:false, type: 'danger',message: alertErrMsg};
                            appServices.alert(alertErrMsg);
                            return false;
                      }
                      else if(date_1st && !date_2nd){
                            var alertErrMsg = "Please Select travelEnd Date";
                            var errorResponse={status:false, type: 'danger',message: alertErrMsg};
                            appServices.alert(alertErrMsg);
                            return false;
                      }else if(date_1st > date_2nd){
                                  var alertErrMsg = "Start Date must be lesser than End Date";
                                  var errorResponse={status:false, type: 'danger',message: alertErrMsg};
                                  appServices.alert(alertErrMsg);
                                  return false;

                      }
              }
              else if(e.myLocations[$index].locationCategory == 'home' && e.myLocations[$index].searchLocation == 0){
                var alertErrMsg = "Please Select Search Area";
                var errorResponse={status:false, type: 'danger',message: alertErrMsg};
                appServices.alert(alertErrMsg);
                return false;
             }



             if(e.myLocations[$index].travelStart != ''){
             	var t1 = new Date(e.myLocations[$index].travelStart);

			    var dd = t1.getDate();
			    var mm = t1.getMonth()+1; //January is 0!

			    var yyyy = t1.getFullYear();
			    if(dd<10){
			        dd='0'+dd
			    } 
			    if(mm<10){
			        mm='0'+mm
			    } 
				t1 = yyyy+'-'+mm+'-'+dd;
             	e.myLocations[$index].travelStart = t1

             	var t2 = new Date(e.myLocations[$index].travelEnd);
             	var dd = t2.getDate();
			    var mm = t2.getMonth()+1; //January is 0!

			    var yyyy = t2.getFullYear();
			    if(dd<10){
			        dd='0'+dd
			    } 
			    if(mm<10){
			        mm='0'+mm
			    } 
				t2 = yyyy+'-'+mm+'-'+dd;
             	e.myLocations[$index].travelEnd = t2
             	
             }
             request = {
                        id              : e.myLocations[$index].id,
                        travelStart     : t1,
                        travelEnd       : t2,
                        searchLocation  : e.myLocations[$index].searchLocation,
                        };

          	 appServices.post(API_URL.saveMyLocation,{request : request}, function(response){

          	 	 if (response.status == 1 && typeof(response.errorMsg) != "undefined"){
                    var alertErrMsg = response.errorMsg;
                    var errorResponse={status:false,type: 'danger',message: alertErrMsg};
                    appServices.alert(alertErrMsg);

                    e.myLocations[$index].travelStart    = "";
                    e.myLocations[$index].travelEnd      = "";
                    return false;
          	 	 }else if (response.status == 1 && typeof(response.errorMsg) == "undefined"){
                    var alertSuccessMsg = "Successfully Saved";
                    var successResponse={status:true,type: 'success',message: alertSuccessMsg};
                    appServices.alert(alertSuccessMsg);
                 }else{
          	 	 	appServices.alert("Please Try Again");
          	 	 	return;
          	 	 }	

          	 	 //reConnectSocket();
          	 });
        }


        e.deleteLocation  = function (myLocationId, myLocationName, locationPrimary){
            request = {myLocationId: myLocationId, myLocationName: myLocationName};
            if(locationPrimary == "primary"){
                     appServices.alert('You don\'t have the permission to delete a primary location');
                     return false;
            }
            else{
                    if (!confirm('Are you sure to delete this location'))
                    {   
                        $event.preventDefault();
                        return;
                    }
                    else
                    {
                        //console.log(" After Alert locationPrimary ======================");
                        //console.log(locationPrimary);
                        //$rootScope.showloader = false;
                        	appServices.post(API_URL.deleteTravelLocation,{request : request}, function(response){
                        		if(response.status == 1){
                        			var alertErrMsg = "Successfully deleted the location "+myLocationName;
                                    appServices.alert(alertErrMsg);
                                    e.getSavedLocations();
                        		}else{
                        			appServices.alert("Please Try Again")
                        			return;
                        		}
                        	})
                    }
                }
    	}

}

