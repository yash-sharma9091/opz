/*
	user poll and vote system 
	user pool and list

*/

angular.module('userPollModule',[])
.controller('userPoll', userPoll)
.controller('allPoll', allPoll)
.controller('refer', refer);

userPoll.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$routeParams','$route','ameLightbox','$http'];
allPoll.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$routeParams','$route','ameLightbox','$http','filterFilter'];
refer.$inject=['$scope', '$rootScope','appServices','$mdDialog','$timeout','$location','$routeParams','$route','ameLightbox','$http','filterFilter'];



function userPoll(e,rootScope,appServices,mdDialog,timeout,location,routeParams,route,lightbox,$http)
{
	e.loading=true;
	e.data={};


//get all poll 

e.getAllPoll= function(){
	e.loading=true;
	var data={};
	
	appServices.post(API_URL.allPoll,data, function(response)
		{	
			e.data=response.data;
			e.latestPollId=e.data.id;
			console.log(e.latestPollId)
	
	e.loading=false;
	//check poll 
	

});

}
	//get recent poll  created by user if approved by admin 
	var data={};
	e.loadPoll= function(){
	appServices.post(API_URL.getPoll,data, function(response)
		{	
		e.data=response.data;
		e.latestPollId=e.data.id;
	
	e.loading=false;
	//check poll 
	e.checkPoll(e.latestPollId);
	e.getPollComment(e.latestPollId);

});

};

//get poll percentage
e.getPollPercentage= function(id){
	if(id)
	{
	var data={id:id};
	appServices.post(API_URL.getPollPercentage,data, function(response)
		{	
			e.percentageData=response.percentageData;
			


		});
	}
}

//get poll commnent bya Id
e.getPollComment= function(id){
	if(id)
	{

	var promise={token:rootScope.isUserLogin.token,
					userRole:'user', id:id};
	appServices.post(API_URL.pollComment,promise, function(response)
		{	
	
			e.userComments=response.data;
		
			
		});
	}
}
e.loadPoll();
//check poll system 
e.checkPoll=function(id){
	if(id)
	{

		var promise={
					token: rootScope.isUserLogin.token, 
					userRole: 'user', 
					id: id};

		appServices.post(API_URL.checkPoll,promise, function(response)
		{	
			
			if(response.count[0].count==0)
						{
                            e.pollAttendedPollById=0;
                            //show question and answers system 
                        }
                        else
                        {
                             e.pollAttendedPollById=1;
                              //show graph and percentage 
                              timeout(function(){
                              	e.getPollPercentage(e.latestPollId);
                              },650)
                        }
		});
	}
	}

//submit a new poll
e.poll_answer = [];
 e.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };
e.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

//submit poll answers 
 e.answerLatestPoll = function (data) 
 {

        var answers=[];
        	//convert object to array
        angular.forEach(e.poll_answer, function(value){
        	answers.push(value.id)
        });


        if(answers==0)
        {
        	e.alert={'message':"Select your answer",'type':'alert-danger'};

        }
        else
        {
   		console.log(answers);
        var promise =
         {
            poll_id: data.id,
            poll_answer:answers,
            poll_answer_comment: data.poll_answer_comment,
            token: rootScope.isUserLogin.userToken,
            userRole:'user'
        };
        console.log(promise);

        if(answers.length>0)
        {

	     	appServices.post(API_URL.submitPoll,promise,function(response)
			{	
				
				//after submit get poll comment 
				e.alert={'message':response.message,'type':'alert-success'};
				appServices.alert(response.message);
				$('body, html').animate({scrollTop:0},900);

				timeout(function(){
					if(reponse.status==true)
					{
						e.data={};
					}
				},500);

			});

		}

		}
}//end function 

//create a new poll
e.newPoll={};
e.newPoll.answer_options=[{'newAnswer':''}];

//add new row
e.addNew= function(data){ 
	
	data.push({'newAnswer':''});

}
//remove new row 
e.remove= function(data,index){
	data.splice(index,1);
}

//submit poll request


e.submitPoll= function(data,form){
	if(form.$valid)
	{
			data['userRole']="user";

			e.alert={'message':"Processing..",'type':'alert-success'};

			appServices.post(API_URL.addPoll,data, function(response)
     		{
					if(response.status==2)
					{
						e.alert={'message':response.message,'type':'alert-danger'};
						
					}
					else
					{
						if(response.message==='success')
						{
							e.alert={'message':"You have successfully create new poll",'type':'alert-success'};
						}
					}
				
				form.$setUntouched();
				form.$setPristine();
				e.newPoll={};


     		});

	}
}
}


///get all poll
function allPoll(e,rootScope,appServices,mdDialog,timeout,location,routeParams,route,lightbox,$http,filterFilter)
{
e.loading=true;
data={};

function pollDeatils(id)
{

var data={id:id};
	appServices.post(API_URL.getPollPercentage,data, function(response)
		{	
			console.log(e.userPoll)
			e.percentageData=response.percentageData;
			if(e.userPoll){
			
				e.polls=filterFilter(e.userPoll,{id:routeParams.id})[0];
			
			}
			e.getPollComment(routeParams.id);

		});


}


appServices.post(API_URL.allPoll,data, function(response)
     		{
     			e.loading=false;
     			e.userPoll=response.data;

     	
				if(routeParams.id)
				{	
					timeout(function(){
						pollDeatils(routeParams.id);
					},650);	
				}


     		});

e.getPollComment= function(id){
	if(id)
	{

	var promise={token:rootScope.isUserLogin.token,
					userRole:'user', id:id};
	appServices.post(API_URL.pollComment,promise, function(response)
		{	
	
			e.userComments=response.data;
		
			
		});
	}
}


e.pollDeatils= function(id)
{

location.path('/poll-details/' +id);
}
}

//refer a friend
function refer(e,rootScope,appServices,mdDialog,timeout,location,routeParams,route,lightbox,$http,filterFilter)
{

	e.getMyBonusHistory= function(){
		e.loading=true;
		var promise={};

		appServices.post(API_URL.getMyBonusHistory,promise, function(response)
				{	
					e.loading=false;
					
					e.bonusHistory=response.data;
				});	


	}

	e.user={}

	//refer a friend
	e.referAfriend= function(data,form){

		if(form.$valid)
		{
			var promise=data;
			promise['userId']=rootScope.isUserLogin.userId;
			promise['userName']=rootScope.userprofile.username;

			

			if(rootScope.isUserLogin.email!=data.referEmail)
			{
					//process to submit
					e.alert={'message':"Processing..",'type':'alert-success'};
				appServices.post(API_URL.referFriend,promise, function(response)
				{	

					e.alert={'message':response.message,'type':'alert-success'};
					
					form.$setPristine();
					form.$setUntouched();

					timeout(function(){
						e.user={};

					},350)


				});	

			}	
			else
			{
				e.alert={'message':"Oops! You can't invite yourself!",'type':'alert-danger'};
				appServices.alert("Oops! You can't invite yourself!");
			}


		}
		else{
			appServices.alert("Please fill all fields");
		}
	}

}
