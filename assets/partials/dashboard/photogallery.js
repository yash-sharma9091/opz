/*
	user photo gallery  module 
	public photo gallery
	private photo gallery
	upload user profile photo gallery 

*/
angular.module('userPhotoGalleryModule',['ngMessages'])
.controller('photoGallery', photoGallery);


//controller injecter
photoGallery.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$routeParams','$route','ameLightbox','$http'];


//private photo gallery
function photoGallery(e,rootScope,appServices,mdDialog,timeout,location,routeParams,route,lightbox,$http)
{ 
	
	//set activate tabs
	var params=['public','private','all'];
	var id=routeParams.id;

	if(id==='private')
	{
		e.selectedTabs=1;
	
	}
	else if(id==='public')
	{
		e.selectedTabs=0;
	
	}
	else if(id==='all')
	{
		e.selectedTabs=2;
		
	}
	else
	{
		e.selectedTabs=0;
	}


e.changeTabs = function()
{	
	
//push object on url
}

	//http request for get video list form server 
		e.loading=true;

		var data={};

		appServices.post(API_URL.getUserphoto,data, function(response)

		{	
		var data=response.data;	

				e.loading=false;
				e.photoList=data;
				e.privatePhotoList=[];
				e.publicPhotoList=[];


					angular.forEach(data, function(data, key){

							if(data.accessType=='public')
							{
									e.publicPhotoList.push(data);

							}	

							if(data.accessType=='private')
							{
									e.privatePhotoList.push(data);

							}	
					})
			
							

			});

		//remove /delete images

		e.removePhoto= function(data, photoId, index,state){

			

			var confirm=appServices.confirmAlert('Confirm?','Are you sure to remove this photo form your photo list', 'default','Yes', 'No');

								mdDialog.show(confirm).then(function(response) 
								{

										
										//remove form server
										var user={'photoId': photoId };
										data[index].isLoading=true;
										appServices.post(API_URL.deleteMyPhoto,user, function(response)

										{		
												data[index].isLoading=false;
												if(response.status==2)
												{
													appServices.openAlertBox('Failed!',"We can't delete your photo please try again" ,'error' );
												}
												else
												{
												data.splice(index,1);
												appServices.alert("Successfully removed from your photo list")
												}
						
										});

								});
		};


		//set profile pic on click
		e.setProfilePicture = function(name,profilePhoto,id,index,data)
		{
			
			var confirm=appServices.confirmAlert('Confirm','Are you sure you want to make this your profile picture?', 'default','Yes', 'No');

								mdDialog.show(confirm).then(function(response) 
								{

										//request to server form server
										var user={'userId':rootScope.isUserLogin['userId'],
												 'userName':rootScope.userprofile.username,
												'justName':name,'photoName': profilePhoto ,
												'photoId': id ,
												profilePicStatus:rootScope.userprofile.profilePic};

										data[index].isLoading=true;
										appServices.post(API_URL.setProfilePic,user, function(response)

										{		
												data[index].isLoading=false;
												if(response.status==1)
												{

												appServices.alert("Successfully set your profile picture")
										
												}
												else 
												{
															appServices.openAlertBox('Failed',"We couldn't set your profile picture. Please try again." ,'error' );
														
												}
						
										});

								});

		};

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


//upload photo

e.fileUploadList=[];// photo list array

e.removeAll= function()
{
	e.fileUploadList=[];
}
e.isUploading=false;


e.sendToserver= function(file,type,key){
	    console.log(type)
	    var fd = new FormData();
	    fd.append('file', file);
	    fd.append('privacy', type);


//header for request
  var $request={
    url:API_URL.uploadPhoto,
    data:fd,
    method:"POST",
    headers: {'Content-Type': undefined},
  };

//push data on server
  $http($request).then(success);

  function success(response)
  {
  
  	e.fileUploadList[key].uploading=false;
  	e.fileUploadList[key].isUploaded=true;
  	
  	//push photo on private list 
  	if(type==='private')
  	{
  		e.privatePhotoList.push(response.data);
  	}
  		//push photo on public  list 
  	if(type==='public')
  	{
  		e.publicPhotoList.push(response.data);
  	}
  		//push photo on main list 
  	e.photoList.push(response.data);

  	//off maine loader
  	if(e.fileUploadList.length===parseInt(key)+1)
			{
				console.log(":main loading false");
			e.isUploading=false;
				
			}

  	return true;
 };

}


//upload file on click upload button 
e.uploadFile= function()
{

	var count=1;
	if(	e.fileUploadList)
	{
		if(e.isUploading==false)
		{
			
		e.isUploading=true;

		var files = e.fileUploadList;

       	angular.forEach(files,function(value,key)
		{
			if(value.isUploaded==false)
			{

			value.uploading=true;
			//send file on server 
			e.sendToserver(value.value, value.privacy,key);
			}
			else
			{
				count++;
			}
			if(files.length===count)
			{
		
				e.isUploading=false;
			}
			});
		
			
     }
	}
}//end upload function
}//end controller