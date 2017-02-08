angular.module('zenbrisa.userProfile',[])
.controller('userProfileView', userProfileView)
.controller('sendPhotoKeyCtrl', sendPhotoKeyCtrl)
.controller('profileview', profileview)
.controller('reportAbuse', reportAbuse);


//controller injector
userProfileView.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams','ameLightbox'];
sendPhotoKeyCtrl.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams','data'];
reportAbuse.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams','data'];


profileview.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams'];

function profileview(e,mdDialog, appServices,localStorageService,rootscope,location,timeout,routeParams,lightbox)
	{
			timeout(function(){
		//crop image
	
		var handleFileSelect=function(evt) {

          var file=evt.currentTarget.files[0];
              evt.target.value='';
          var reader = new FileReader();
          reader.onload = function (evt) {
            e.$apply(function(e){
              e.myImage=evt.target.result;
              //open modal
              var data={};
              data["image"]=e.myImage;
              data["user"]=rootscope.isUserLogin.userId;
              data["name"]=file.name;


           	   
              appServices.modal('partials/dashboard/userProfile/crop.profile.image.html',cropImage, evt,data);	
           
            });
          };

          reader.readAsDataURL(file);

        };


      angular.element(document.querySelector('#uploadImage')).on('change',handleFileSelect);
   
  },650);

	if(!rootscope.isUserLogin)
	{
		location.path('/');
	}

								
	rootscope.ProfileCount();
	console.log("sjkfhsjd");
};

function userProfileView(e,mdDialog, appServices,localStorageService,rootscope,location,timeout,routeParams,lightbox)
{

e.loading=true;
var id=routeParams._id;

var user={objectUserId:id}

e.isUserProfile=true;
e.isUserId=id;

function getOtherUserDeatils1()
{
timeout(function(){
//get basic information for public user

appServices.post(API_URL.getOtherUserProfile,user, function(response)
     {		
     		if(response.status==1)
     		{
     			e.userprofile=appServices.removeNull(response.data[0]);
     			rootscope.ProfileCount(e.isUserId);


     		}
     		else
     		{
     			location.path('/');
     		}
     		e.loading=false;
     		
     });
},100);
}

getOtherUserDeatils1();

function getOtherUserDeatils(){
}
 //getting all counts common for otherProfileMenu sulthan
 e.ChekUser= function(id)
 {


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

if(e.isUserId)
{
	var promise={"objectUserId":e.isUserId};

			appServices.post(API_URL.addPrivateNote,promise, function(response)
    		 {		
	 			if(response.status==1)
	 			{	if(response.data)
	 				{
 					e.privateMessage=response.data.note;
	 				}

	 			}

    		 });


}
e.privateNote=false;
//add private note;
e.AddPrivateNote = function(data, form, id)
{

	if(form.$valid)
	{			

			e.processing=true;
		
			var promise={"objectUserId":id, "privateNote":data};

			appServices.post(API_URL.writePrivateNote,promise, function(response)
    		 {		
	 			if(response.status==1)
	 			{
 					appServices.alert("Successfully saved your private  message");	
	 			}

				e.processing=false;
    		 });

	}
}	

var path=location.path();
	
//get video 
if(path.indexOf('video')>=0)
{

getOtherUserDeatils();

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
	getOtherUserDeatils();

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
	getOtherUserDeatils();


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
e.openLightbox= function(data, index)
	{

	var imageList=[];
	angular.forEach(data, function(value){
		imageList.push(value.imageName);
	})
	var options = { keyboard: true,showDots: false, initialIndex:index};
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

getOtherUserDeatils();

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

//write a review for user
e.rate = 5;
e.max = 5;
e.hoveringOver = function(value) {

    e.overStar = value;
    e.percent = 100 * (parseInt(value) / e.max);
  };


e.review={};
//write a review
e.WriteReview= function(data, form){
	if(form.$valid)
	{
			data['reviewedOnId']=routeParams._id;

			

			appServices.post(API_URL.addReview ,data, function(response)
			{
				if(response.status==1)
				{
					 e.alert={'message':'Your review has been submitted successfully. You will be notified when Moderator approves your review.','type':'alert-success'};   

				}
				else{
					if(response.message)
					{
					 e.alert={'message':response.message,'type':'alert-danger'};   
					}
					else
						{e.alert={'message':"Please try again?",'type':'alert-danger'};   }

				}

				form.$setPristine();
				form.$setUntouched();
				e.review={};
			});

	}

}

e.process=false;
//request a photo key
e.RequestPhotoKeySearch=function(id,process)
{	
		
		var data={
				"receiverId":id,
				"composeSubject":"Primary Photo request",
				"composeMessage":"Hi, "+ rootscope.isUserLogin.username+" would like to see your picture. Would you upload a Primary Photo please?",
				"entryId":"undefined","replyMailStatus":"sent"};

		e.process=true;
		appServices.post(API_URL.saveMail ,data, function(response)
			{
				if(response.status==1)
				{
					appServices.openAlertBox('',"Your Message has been sent",'success' );

				}
				else
				{
					appServices.openAlertBox('',response.message,'error' );
					
				}
				e.process=false;

			
			});

}


//report reportAbuse
e.reportAbuse= function(ev,user, id){
		var data={};
			data["id"]=user.id;
			data["username"]=user.username;
			data['reportTo']=id;

		appServices.modal('partials/dashboard/reportAbuse/reportAbuse.html', reportAbuse, ev,data)
}
};//end controller


function sendPhotoKeyCtrl(e,mdDialog, appServices,localStorageService,rootScope,$location,timeout,routeParams,data)
{ 
			e.cancel = function() 
			{
				mdDialog.cancel();
			};

			e.message="I'd like to see your private photos. Would you send me a Photo Key, please??"
			var id=routeParams._id?routeParams._id:data.id;
			console.log(id);

			e.sendkey= function(data){
				e.loading=true;

				var data={
					title:"Request Photo Key",
					message:data,
					to_id:id,
					request_type:"private_photo"
				}


				appServices.post(API_URL.requestPhotoKey,data, function(response)
				{			
						
						if(response.status==1)
						{
							e.alert={'message':"A request has been sent to the user.",'type':'alert-success'};
							e.isSend=true;
						}

						e.loading=false;

								
				});

			}

}

//reportAbuse

function reportAbuse(e,mdDialog, appServices,localStorageService,rootScope,$location,timeout,routeParams,data)
{ 
			e.cancel = function() 
			{
				mdDialog.cancel();
			};

	e.user=data;
	e.isSend=false;

	e.reportAbuse = function(message, form)
	{
	var promise={"userId":e.user.id,"reporterId":e.user.reportTo,"reportNote":message};
	console.log(promise)

	if(form.$valid)
	{
		e.loading=true;
	appServices.post(API_URL.reportAbuse,promise, function(response)
				{			
						
						if(response.status==1)
						{
							e.alert={'message':"Thanks for reporting! Zenbrisa will take care of it",'type':'alert-success'};
							e.isSend=true;
						}
						else{
							e.alert={'message':response.message,'type':'alert-danger'};
							}

						e.loading=false;

								
				});
	}
	}

}