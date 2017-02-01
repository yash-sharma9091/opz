
angular.module('zenbrisa.blogComment',[])
.controller('blogCommentCtrl', blogComment);

blogComment.$inject=['$scope','$mdDialog','appServices','localStorageService','$rootScope','$location','$timeout','$routeParams','$http'];

function blogComment(e,mdDialog, appServices,localStorageService,rootScope,location,timeout,$routeParams,$http)
{	
	var id = $routeParams.blogId;
	var slug = $routeParams.slug;
	e.loading=true;
	getSingleBlog();
	getBlogComments();

	// Get comments of particular blog
	function getBlogComments() {
		var request = {
			blogId: id
		};
		appServices.post(API_URL.getBlogcommentList,{request : request},function(response){
			if(response.status == 1){
				e.comments = response.data;
			} else {

			}
		});
	}

	// Get a single blog by slug
	function getSingleBlog(){
		e.loading=true;
		
		if(typeof id != undefined && id != null && id !=''){
			var request = {
				blogId: slug,
				authorType: "user"
			};
			appServices.post(API_URL.getSingleBlog,{request : request},function(response){
				e.loading=false;
				if(response.status == 1){
					/*Blog Found*/
					e.blogData = response.data;
				}else{
					/*Blog not found*/
					//location.path('/blogs');
				}
			});
		}else{
			location.path("/blogs");
		}
	}
	
	e.leaveComment = function (isValid) {
        if(!isValid){
            return;
        }
        var request = {
			blogId: id,
			comment: e.blogcomment
		};
        appServices.post(API_URL.addBlogComment,{request : request},function(response){
			if(response.status == 1){
				getBlogComments();
				e.blogCommentForm.$setUntouched();
				e.blogCommentForm.$setPristine();
				e.blogcomment = '';
			}else{
				e.alert = {'message':response.message,'type':'alert-danger'};
			}
		});
    };
}	