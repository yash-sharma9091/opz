
angular.module('zenbrisa.blog',[])
.controller('blog', blog);

blog.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams','$http'];

function blog(e,mdDialog, appServices,localStorageService,rootScope,location,timeout,$routeParams,$http)
{
	e.loading=true;
    var config = {
        limit: 50,
        offset: 0
    };
	var data={};

	e.blogs = function(){
		appServices.post(API_URL.blogList,config, function(response)
		{	
			e.loading=false;
			e.data=response.data;
            var totalCount = (response.count) ? response.count.count : 0;
            e.paging = {
                total:  totalCount,
                pages : Math.ceil(totalCount/config.limit),
                limit : config.limit,
                start : (config.offset*config.limit)+1,
                end : (totalCount < ((config.offset+1)*config.limit)) ? totalCount : ((config.offset+1)*config.limit),
                offset : config.offset,
                current: 1,
                steps : 5,
                onPageChanged: loadPages,
            };
		}); 
	}

    function loadPages() {
        e.paging['start'] = (((e.paging.current-1)*e.paging.limit)+1);
        e.paging['end'] = (e.paging['total'] < (e.paging.current*e.paging.limit)) ? e.paging['total'] : (e.paging.current*e.paging.limit);
        e.paging['page'] = e.paging.current;
        config.offset = ((e.paging.current-1)*e.paging.limit);
        appServices.post(API_URL.blogList,config, function(response)
        {   
            e.loading=false;
            e.data=response.data;
            $('body, html').animate({
               scrollTop:0
            },900);
        });
    }

	e.goToBlog = function(id, title){
		location.path("blog/"+id+"/"+(title).replace(/\s+/g, "-"))
	}

	e.goTo = function(url){
		location.path(url);
	}


	//Add New Blog
    e.addUserBlog = function () {

        var fd = new FormData();
        var fd1 = new FormData();
        var title = e.newTitle;
        var description = e.newDescription;
        var featuredImage = e.newFeaturedImage;

        if (!title && !description) {
            appServices.alert("Please Enter all fields");
            return;
        }
        else if (!title || !isNaN(title)) {
            appServices.alert("Please Enter a valid Title");
            return;
        }
        else if (!description) {
            appServices.alert("Please Enter a Description");
            return;
        }
        else if(!e.shortDescription){
           appServices.alert("Please Enter a Short Description");
           return;
       }
       else
       {

        	//$rootScope.showloader = true;
           e.buttonDisabled = true;
           fd.append('title', title);
           fd.append('description', description);
           fd.append('shortDesc',e.shortDescription);
           fd1.append('attachments',featuredImage);

            //appServices.post(API_URL.uploadImage, fd1);
            $http.post(API_URL.uploadImage, fd1, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                
                if(response.data.length > 0 && response.data[0].fname){
                    fd.append('featuredImage',response.data[0].fname);    
                }
                
                if (response.status === 1)
                {
                    $http.post(API_URL.addBlog, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }).success(function (response) {
                     //$rootScope.showloader = false;
                     e.buttonDisabled = false;
                     if (response.status == 1)
                     {
                     	appServices.alert("Your Post has been submitted successfully. It will be displayed once approved.");
                        location.path('/blogs');
                    }
                }).error(function () {
                 //$rootScope.showloader = false;
                 e.buttonDisabled = false;
                 appServices.alert("Please Try Again");
                 return false;
             });
            }
        });

        }

    }


    e.pickImage  = function (_this,type){
        e.uploadImage(_this,type,function(response){
            if (response.status === 1)
            {
                e.message= response.data;
            } else {
             appServices.alert("Error in updating user fields.");
             return;
         }
     });
    };

    e.uploadImage = function (event,page,successCallback) {
        var files = [];
        var fd = new FormData();
        
        if (event.files) {
            for (var i = 0; i < event.files.length; i++) {
                files.push(event.files[i]);
                // Becuase we know we are uploading single image
                e.myFilename = event.files[i].name;
            }
        }
        if (files) {
            for (var i = 0; i < files.length; i++) {
                fd.append('attachments', files[i]);
            }
        }

        $http.post(API_URL.uploadImage,fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function(response){
            successCallback(response);

        }).error(function (err) {
          console.log("ERROR" + err);
      });
    };

}
