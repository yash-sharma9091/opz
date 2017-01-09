angular.module('userDashboardSearchModule',[]).controller('userDashboardSearch', userDashboardSearch);

userDashboardSearch.$inject=['$scope', '$rootScope','appServices'];

function userDashboardSearch(e, rootscope,appServices)
{
	e.commonMilesArray              = appServices.milesList();

}

