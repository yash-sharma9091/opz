angular.module('userDashboardModule',['ngMessages']).controller('userDashboard', userDashboard);

userDashboard.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location'];

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
	//e.setting();
}

