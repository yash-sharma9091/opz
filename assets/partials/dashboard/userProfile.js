angular.module('zenbrisa.userProfile',[])
.controller('userProfileView', userProfileView)
.controller('sendPhotoKeyCtrl', sendPhotoKeyCtrl);

//controller injector
userProfileView.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams','ameLightbox'];
sendPhotoKeyCtrl.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams','ameLightbox','$routeParams'];




function userProfileView(e,mdDialog, appServices,localStorageService,rootscope,location,timeout,routeParams,lightbox)
{

e.loading=true;
var id=routeParams._id;

var user={objectUserId:id}

e.isUserProfile=true;
e.isUserId=id;

timeout(function(){
//get basic information for public user
appServices.post(API_URL.getOtherUserProfile,user, function(response)
     {		
     		if(response.status==1)
     		{
     			e.userprofile=appServices.removeNull(response.data[0]);
     			e.userInfoCount=appServices.removeNull(response.data3[0]);
     			

     		}
     		else
     		{
     			location.path('/');
     		}
     		e.loading=false;
     		
     });
},100)
 //getting all counts common for otherProfileMenu sulthan
 e.ChekUser= function(id){


var promise={userId:id};
appServices.post(API_URL.getAllCountOtherprofile,promise, function(response)
     {		
     		 if(response.data[0].favouritecount>0){
                e.favYes=true;
            }
            else{
               e.favYes=false;
            }
            if(response.data[0].blockedCount>0){
                e.blockYes=true;
            }
            else{
                e.blockYes=false;
            }

     		
     });
}
	

var path=location.path();
	
//get video 
if(path.indexOf('vedio')>=0){

	console.log("video");

	var data={'userId':id};
	e.loading=true;
		appServices.post(API_URL.getUserVideo,data, function(response)

		{	

		var data=response.data;	
				e.loading=false;
				rootscope.videoList=data;
				console.log(rootscope.videoList);
			});
}


//reviews-received
if(path.indexOf('reviews-received')>=0)
{
	console.log("reviews-received");
	var data={'otherprofileId':id};
	e.loading=true;

		appServices.post(API_URL.getReviewsOther,data, function(response)
		{	
		var data=response.data;	
				e.loading=false;
				e.data=data;
				console.log(e.data);

		});
}



//reviews-penned
if(path.indexOf('reviews-penned')>=0)
{

	console.log("reviews-penned");
	var data={'otherprofileId':id};

	e.loading=true;

		appServices.post(API_URL.reviewsPennedOtherprofile,data, function(response)

		{	
		var data=response.data;	
				e.loading=false;
				e.data=data;
				console.log(e.data);

		});
}

//add user to fav
e.AddFav= function(id)
{
	
	var data = {
					favId: id,
					favEmail:e.userprofile.email
				};


		appServices.post(API_URL.addTofav,data, function(response)

		{	
			console.log(response);

			if(response.status==1){

						appServices.alert(e.userprofile.username+" has been marked as your favorite");
						e.favYes=true;
				}

		});

}


//remove user form  fav
e.removeFav= function(id)
{
	
	var confirm=appServices.confirmAlert('Confirm?','Are you sure to remove '+e.userprofile.username+' from your favorites list ', 'default','Yes', 'No');

		mdDialog.show(confirm).then(function(response) 
		{

		var data = { favUserId: id };


		appServices.post(API_URL.removeTofav,data, function(response)

		{	
			console.log(response);

			if(response.status==1)
				{

						appServices.alert(e.userprofile.username+" has been removed from your favorites list");
						e.favYes=false;
				}

		});
		});

}


//add user to fav
e.AddBlockUser= function(id)
{
	var confirm=appServices.confirmAlert('Confirm?','Do you want to block  '+e.userprofile.username, 'default','Yes', 'No');

		mdDialog.show(confirm).then(function(response) 
		{

	var data = {
					blockedUserId: id,
					blockedusremail:e.userprofile.email
				};


		appServices.post(API_URL.blockuser,data, function(response)

		{	
			console.log(response);

			if(response.status==1){

						appServices.alert(e.userprofile.username+" has been added  as your blocklist");
						e.blockYes=true;
				}

		});
	});
}


//remove user form  fav
e.removeBlockuser= function(id)
{
	
	var confirm=appServices.confirmAlert('Confirm?','Are you sure to remove '+e.userprofile.username+' from your blocked list ', 'default','Yes', 'No');

		mdDialog.show(confirm).then(function(response) 
		{

		var data = { blockedUserId: id };


		appServices.post(API_URL.unblockAUser,data, function(response)

		{	
			console.log(response);

			if(response.status==1)
				{

						appServices.alert(e.userprofile.username+" has been removed from your block list");
						e.blockYes=false;
				}

		});
		});

}

//open lightbox
e.openLightbox= function(data)
	{

	var imageList=[];
	angular.forEach(data, function(value){
		imageList.push(value.imageName);
	})
	var options = { keyboard: true,showDots: false};
    lightbox.show(imageList, options)
}


//user public photo gallery


if(routeParams.id=='public')
{		
	e.loading=true;
	e.public=true;
	var data={userId:routeParams._id}
		appServices.post(API_URL.getPublicPhoto,data, function(response)

		{	
				var data=response.data;	
				e.loading=false;
				e.photoList=data;
			
			});

}

if(routeParams.id=='private')
{
	e.private=true;
	e.isValidGallery=false;


	e.ChekPrivateKey= function(data, form){
		var data={key:data.photokey,objectUserId:routeParams._id};

		appServices.post(API_URL.checkPhotoKey,data, function(response)

		{		

				var data=response;	
				if(data.status==2)
				{
					e.alert={'message':data.message,'type':'alert-danger'};
					appServices.alert(data.message);
					
			 	}
			 	if(data.status==1)
				{
					e.alert={'message':data.message,'type':'alert-success'};
					e.isValidGallery=true;
					e.photoList=response.data;

			 	}
			
			});
	}



}

//send photo key
e.sendPhotoKey= function(ev)
{
	appServices.modal('partials/dashboard/photoKey/send-photo-key.html', sendPhotoKeyCtrl, ev)
}
};//end controller


function sendPhotoKeyCtrl(e,mdDialog, appServices,localStorageService,rootScope,$location,timeout,routeParams)
{ 
			e.cancel = function() 
			{
				mdDialog.cancel();
			};

			e.message="I'd like to see your private photos. Would you send me a Photo Key, please??"

			e.sendkey= function(data){
				e.loading=true;

				var data={
					title:"Request Photo Key",
					message:data,
					to_id:routeParams._id,
					request_type:"private_photo"
				}


				appServices.post(API_URL.requestPhotoKey,data, function(response)
				{			
						
						if(response.status==1)
						{
							e.alert={'message':"A request has been sent to the user.",'type':'alert-success'};
						}

						e.loading=false;

						timeout(function(){
							mdDialog.cancel();
						
						},3000)
								
				});

			}

}