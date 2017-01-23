angular.module('userDashboardModule',['ngMessages']).controller('userDashboard', userDashboard)
.controller('MyFavourites', MyFavourites)
.controller('blockedusers', blockedusers)
.controller('userReviewPined', userReviewPined)
.controller('userReviewReceived', userReviewReceived)
.controller('myVedio', myVedio)
.controller('addNewVideo', addNewVideo);;

userDashboard.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location'];
MyFavourites.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];
blockedusers.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];
userReviewPined.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];
userReviewReceived.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];
myVedio.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast','$sce'];
addNewVideo.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$mdToast'];



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
	e.setting();

	e.updateSetting= function(user)
	{
			
			if(user)
			{
				user=user;
			}
			$timeout(function(){
			appServices.post(API_URL.updateSetting,e.user, function(response)
           {   
           		
           		e.user=response.data;
           		
           });
		},200)
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
			var confirm=appServices.confirmAlert('Confirm?','Are you sure to delete your Zenbrisa Account', 'default','Yes', 'No');
			
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

	var confirm=appServices.confirmAlert('Confirm?','Are you sure to remove form your Favourites list ', 'default','Yes', 'No');

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

	var confirm=appServices.confirmAlert('Confirm?','Are you sure to remove form your Block list ', 'default','Yes', 'No');

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


// user userReviewPined controller 
function userReviewPined(e, rootscope,appServices,$mdDialog,$timeout,location,mdToast)
{
		//http request for get review form server 
		e.loading=true;
		var data={};
		appServices.post(API_URL.getMyPennedReview,data, function(response)

		{	

		var data=response.data;	
				e.loading=false;
				e.data=data;

		});

}


// user userReviewPined controller 
function userReviewReceived(e, rootscope,appServices,$mdDialog,$timeout,location,mdToast)
{
		//http request for get review form server 
		e.loading=true;
		var data={};

		appServices.post(API_URL.getReviews,data, function(response)

		{	

		var data=response.data;	
				e.loading=false;
				e.data=data;

		});

}

// user userReviewPined controller 
function myVedio(e, rootscope,appServices,mdDialog,$timeout,location,mdToast,$sce)
{

		//http request for get video list form server 
		e.loading=true;

		var data={'userId':rootscope.isUserLogin.userId};

		appServices.post(API_URL.getUserVideo,data, function(response)

		{	

		var data=response.data;	
				e.loading=false;
				rootscope.videoList=data;
			});
	//open add video diaglog-box
	e.addvideo=function(ev)
	{
			appServices.modal('partials/dashboard/my-vedio/add-new-video.html', addNewVideo, ev);
	}



//delete video by ID
e.deleteVideoById = function(id,data,index)
{
	var confirm=appServices.confirmAlert('Confirm?','Are you sure to remove from your video list ', 'default','Yes', 'No');

								mdDialog.show(confirm).then(function(response) 
								{

										data.splice(index,1);
										//remove form server
										var user={'videoId':id};
										appServices.post(API_URL.deleteMyPhoto,user, function(response)

										{
												appServices.alert("Successfully removed from your video list")
								
						
										});

								});
	
}



//openmodal full srceen 
e.zoomMap = function(url,title,evt)
{
				rootscope.videourl=url;
				rootscope.videoTitle=title;

			    mdDialog.show({
			   	  controller: 'addNewVideo',
			      templateUrl: 'partials/dashboard/my-vedio/view-video.html',
			      parent: angular.element(document.body),
			      targetEvent: evt,
			      scope:e.$new(),
			      clickOutsideToClose:true,
			      fullscreen:true // Only for -xs, -sm breakpoints.
			    })
			    .then(function(answer) {
			   
			    }, function() {

			      
			    });
  };



} //end controller 

function addNewVideo(e,$rootScope,appServices,$mdDialog,$timeout,$location,$mdToast)
{
e.video={};
e.cancel= function()
	{
	
		$mdDialog.cancel();
	}

e.AddVideo = function(form,data)
{
	
	if(form.$valid)
	{
	e.alert={'message':"Processing..",'type':'alert-success'}
	e.isProcess=true;
	data['userid']=$rootScope.isUserLogin.userId;

	appServices.post(API_URL.AddUserVideo,data, function(response)

		{	
			if(response.limitExceed===true)
			{
				e.alert={'message':"You don't have allowed added video Limit Exceeded",'type':'alert-danger'};	
			}
			
			
			if(response.data)
			{
				$rootScope.videoList.push(response.data);
				e.isProcess=false;
				e.video={};
				e.alert={'message':"Your video has been successfully added",'type':'alert-success'};
			}

		});	
	}
}

}