angular.module('userDashboardModule',['ngMessages']).controller('userDashboard', userDashboard)
.controller('MyFavourites', MyFavourites)
.controller('blockedusers', blockedusers)
.controller('userReviewPined', userReviewPined);

userDashboard.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location'];
MyFavourites.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];
blockedusers.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];
userReviewPined.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];



function userDashboard(e, rootscope,appServices,$mdDialog,$timeout,location)
{
	//e.user={"provisitMailStatus":"disable","sensualAds":"disable","searchProfileStatus":"disable","newMailStatus":"disable","pollMailStatus":"disable"};
	e.user={};
	e.userPassword={};
	e.delete={}

	e.hideAlert= function(){
						$timeout(function()
						{
								e.alert=false;
								e.alert1=false;
						},15000);
}
	e.setting= function(user)
	{
			
			if(user)
			{
				user=user;
			}


			appServices.post(API_URL.getSetting,e.user, function(response)
           {   
           		e.user=response.data;
           });
	}

	e.updateSetting= function(user)
	{
			
			if(user)
			{
				user=user;
			}

			appServices.post(API_URL.updateSetting,e.user, function(response)
           {   
           		console.log(response)
           		e.user=response.data;
           });
	}


	//update user password
	e.updatePassword = function(form,data){
		console.log(rootscope.isUserLogin);
		console.log(data);

		if(form.$valid)
		{
		e.alert={'message':'Processing..','type':'alert-success'};
		data['userId']=rootscope.isUserLogin.userId;

		appServices.post(API_URL.updatePassword,data, function(response)
           {   
           		
           		var data=response;
           		if(data.status==1)
           		{
           			e.alert={'message':data.message,'type':'alert-success'};
           			appServices.openAlertBox('Success',data.message,'success' );
           		}
           		if(data.status==3)
           		{
           			e.alert={'message':data.message,'type':'alert-danger'};
           			appServices.openAlertBox('Error',data.message,'error')
           		}
           		
           		 form.$setPristine();
           		 form.$setUntouched();
           		 e.userPassword={}
           		 form.confirmPassword.$setValidity('passwordVerify',true);


           });

		}
	}

	//delete user acount 
	e.DeleteUserAccount= function(form,data){
		if(form.$valid)
		{
			e.alert1={'message':'Processing..','type':'alert-success'};
			var confirm=appServices.confirmAlert('Are you sure?','Are you sure to delete your Zenbrisa Account', 'default','Yes', 'No');
			
			data['userId']=rootscope.isUserLogin.userId;
			appServices.post(API_URL.DeleteUserAccount,data, function(response)
           					{
           						if(response.status==2)
           						{
           							e.alert1={'message':response.message,'type':'alert-danger'};
           								
           						}

           					else{

								$mdDialog.show(confirm).then(function(response) 
								{
								//delete user account
								
								if(response)
								{
									data['userId']=rootscope.isUserLogin.userId;

									appServices.post(API_URL.deleteUserAccountData,data, function(response){
										console.log(response.data[0].status);

										if(response.status==1)
										{
											console.log("ok");

												if(response.data[0].status=='delete')
												{

														appServices.openAlertBox('Success','Your account has been deleted. Please contact Admin for further assistance. ','success' );
														rootscope.logout();
														location.path('/');
												}
										}
									});
								}

								}, function(response) {
								//do nothing 
															form.$setPristine();
															form.$setUntouched();
															e.delete={}
															e.alert1=false;

														
								});

           					}
           					});  


			  			e.hideAlert();



		}

	}
	

}

//MyFavourites controller
function MyFavourites(e, rootscope,appServices,$mdDialog,$timeout,location,mdToast)
{
		e.loading=true;
		var data={};
		appServices.post(API_URL.getfavourite,data, function(response)

		{	

		var data=response.result;	
	
				
				e.loading=false;
				if(response.status==1)
				{
					
					e.data=data;
				}	


		});

//set setUnfavorite user
e.setUnfavorite =function(id, index,data){

	var confirm=appServices.confirmAlert('Are you sure?','Are you sure to remove form your Favourites list ', 'default','Yes', 'No');

								$mdDialog.show(confirm).then(function(response) 
								{

										data.splice(index,1);
										
										//remove form server
										var user={'favUserId':id};
										appServices.post(API_URL.removefavourite,user, function(response)

										{
												if(response.status==1)
												{
													if(response.result==1)
													{
														appServices.alert("Successfully removed from your favorite list")
								
													}
												}	
										});

								});
	

};

}


//blocked user controller
function blockedusers(e, rootscope,appServices,$mdDialog,$timeout,location,mdToast)
{
		e.loading=true;
		var data={};
		appServices.post(API_URL.getblockUser,data, function(response)

		{	

		var data=response.data;	
							
				e.loading=false;
				if(response.status==1)
				{
					e.data=data;
				}	


		});

//remove form block list 
e.setUnBlock=function(id, index,data){

	var confirm=appServices.confirmAlert('Are you sure?','Are you sure to remove form your Block list ', 'default','Yes', 'No');

								$mdDialog.show(confirm).then(function(response) 
								{

										data.splice(index,1);
										
										//remove form server
										var user={'blockedUserId':id};
										appServices.post(API_URL.removeBlockuser,user, function(response)

										{
												if(response.status==1)
												{
													
														appServices.alert("Successfully removed from your block list")
								
												
												}	
										});

								});
	

};

}


//blocked user controller
function userReviewPined(e, rootscope,appServices,$mdDialog,$timeout,location,mdToast)
{
		e.loading=true;
		var data={};
		appServices.post(API_URL.getblockUser,data, function(response)

		{	

		var data=response.data;	
							
				e.loading=false;
				if(response.status==1)
				{
					e.data=data;
				}	


		});

//remove form block list 
e.setUnBlock=function(id, index,data){

	var confirm=appServices.confirmAlert('Are you sure?','Are you sure to remove form your Block list ', 'default','Yes', 'No');

								$mdDialog.show(confirm).then(function(response) 
								{

										data.splice(index,1);
										
										//remove form server
										var user={'blockedUserId':id};
										appServices.post(API_URL.removeBlockuser,user, function(response)

										{
												if(response.status==1)
												{
													
														appServices.alert("Successfully removed from your block list")
								
												
												}	
										});

								});
	

};

}