// controller for date, time, weather, and location
app.controller('dashboardDataCtrl', function($scope, $http, $rootScope) {
	var dashboardData = this;

    // get and set current date and time
    dashboardData.getDate = function() {
	    var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    	thisDate = new Date(),
	    	day = thisDate.getDate(),
	    	monthNumber = thisDate.getMonth(),
	    	month = monthArray[monthNumber],
	    	year = thisDate.getFullYear(),
	    	hour = thisDate.getHours(),
	    	minute = thisDate.getMinutes(),
	    	dateAndTime = {},
	    	hourAbbrev;

	    if (hour > 12) {
	    	hour = hour - 12;
	    	hourAbbrev = "PM";
	    } 
	    else if (hour == 0) {
	    	hour = 12;
	    	hourAbbrev = "AM";
	    } 
	    else {
	    	hourAbbrev = "AM";
	    }

	    if (minute < 10) {
	    	minute = "0" + minute.toString();
	    }

	    dateAndTime.date = month + ' ' + day + ', ' + year;
	    dateAndTime.time = hour + ":" + minute + " " + hourAbbrev;

	    return dateAndTime;
    }

    dashboardData.date = dashboardData.getDate().date;
    dashboardData.time = dashboardData.getDate().time;


    // get location and call weather api
	dashboardData.geolocationEnabled = true;
	dashboardData.weatherLoading = true;
    
    dashboardData.getPosition = function(position) {
		dashboardData.position = position;
		$rootScope.$broadcast('location-found');
    }

    dashboardData.getError = function(error) {
    	dashboardData.geolocationEnabled = false;
    	dashboardData.weatherLoading = false;
    	$scope.$apply();
    }

    dashboardData.getWeather = function() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(dashboardData.getPosition, dashboardData.getError);
			
		} else {
			dashboardData.geolocationEnabled = false;
			dashboardData.weatherLoading = false;
			$scope.$apply();
		}

		$scope.$on('location-found', function(resp) {
			var latitude = dashboardData.position.coords.latitude;
		    var longitude = dashboardData.position.coords.longitude;

			$http.get('http://api.wunderground.com/api/26f1bcbadc87fe35/conditions/forecast/alert/q/'+latitude+','+longitude+'.json')
		        .success(function(response) {
		          dashboardData.temp = Math.round(response.current_observation.temp_f);
		          dashboardData.location = response.current_observation.display_location.city;
		          dashboardData.weatherLoading = false;
		        });
		});
	}
	dashboardData.getWeather();
});