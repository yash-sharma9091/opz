angular.module('app.direcrives',[])
.directive('owlCarosuel',['$timeout', function($timeout){
	return {
		scope:{loading:'='},
	link: function(scope,ele,attrs){
		scope.loading=false;
		$timeout(function(){
			$(ele).owlCarousel({
				items:1,
	      loop:true,
	      margin:0,
	      autoplay:true,
	      nav:false,
	      smartSpeed:3000,
	      slideSpeed : 3000,
	      autoplayTimeout:7000});
		},10);
		$timeout(function(){
			scope.loading=true;
		},650)
	}
}}]).directive('scrollOffset', ['$window',function($window){
  return{
    link:function(scope, element, attrs)
		{
		if(attrs.scroll=="true")
			{
			$(window).scroll(function(){
				if($(window).scrollTop()>200)
				{	
				
					if(window.getComputedStyle(element[0], null).display=='none')
					{
					 element.fadeIn(500);
					 return ;
					}
				}
				else
					{
					 if(window.getComputedStyle(element[0], null).display=='block')
					{
					 element.fadeOut(500);
					 return;
					}
					}
				});
			 }
	//-----------
    	element.on('click', function()
		{
<<<<<<< HEAD
			$('body, html').animate({
		       scrollTop:$('.'+attrs.scrollOffset).offset().top -30
		    },900);
=======
	  $('body, html').animate({
        scrollTop:$('.'+attrs.scrollOffset).offset().top -30
      },900);
>>>>>>> 88062ba671366f9bbfc63791f98d9f344a979f38
    	});

    }
  }
}]);
