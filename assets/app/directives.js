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
			$('body, html').animate({
		       scrollTop:$('.'+attrs.scrollOffset).offset().top -30
		    },900);
    	});

    }
  }
}]).directive('reating', ['$window',function($window){
  return{
  	scope:{reatingData:'='},
  	template:'<small ng-repeat="x in stars track by $index"><md-icon ng-if="x==1">star_rate</md-icon><md-icon ng-if="x==0">star_half</md-icon></small>',
    link:function(scope, element, attrs)
		{
			scope.stars=[];
			
			var i=scope.reatingData;
			
			if(i>=0.5 && i<=1)
			{
				scope.stars.push(0);
			}
			else if(i>=1 && i<=1.5)
			{
				scope.stars.push(1);
			}
			else if(i>=1.5 && i<=2)
			{
				scope.stars.push(1,0);
			}
			else if(i>=2 && i<=2.5)
			{
				scope.stars.push(1,1,0);
			}
			else if(i>=2.5 && i<=3.5)
			{
				scope.stars.push(1,1,1,0);
			}
			else if(i>=3.5 && i<=4.5)
			{
				scope.stars.push(1,1,1,1);
			}
			else if(i>=4.5 && i<=5.5)
			{
				scope.stars.push(1,1,1,1,0);
			}
			else if(i>=5.5 && i<=6.5)
			{
				scope.stars.push(1,1,1,1,1);
			}

		
		}
  }
}]).directive('passwordVerify', passwordVerify);

  function passwordVerify() {
    var directive = {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      var status = true;
      scope.$watch(function () {
        var combined;
        if (scope.passwordVerify || ngModel) {
          combined = scope.passwordVerify + '_' + ngModel;
        }
        return combined;
      }, function (value) {
        if (value) {
          ngModel.$validators.passwordVerify = function (password) {
            var origin = scope.passwordVerify;
            return (origin === password);
          };
        }
      });
    }
  };
