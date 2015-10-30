'use strict';

var app = angular.module('dashboardApp', ['ui.sortable', 'LocalStorageModule'])

// controller for todo list
app.controller('todoListCtrl', function($scope, $filter, localStorageService) {
	var todoList = this,
		todosInStore = localStorageService.get('myTodos');

	todoList.isDesktop = $(window).width() > 1024;
	todoList.todos = todosInStore || [];

	// pass in the view model's controller alias as the first param and 
	// update localstorage when there are updates to the todos array
	$scope.$watch('t.todos', function () {
		localStorageService.set('myTodos', todoList.todos);

	    var lastIndex= todoList.todos.length - 1,
	  		lastEl = todoList.todos[lastIndex];

		if(lastEl === "" || lastEl === undefined || lastEl === null) {
		  	todoList.todos.pop();
		}
	}, true);

	todoList.addTodo = function(todo) {
	    todoList.todos.push(todo);
	    $scope.todo = '';
	};

	todoList.removeTodo = function(index) {
	    todoList.todos.splice(index, 1);
    };

    todoList.completeTodo = function(todo) {
    	todo.completed = true;
    }

    todoList.sortTodos = function() {
    	todoList.todos = $filter('orderBy')(todoList.todos, 'priority');
    }
});



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

	dashboardData.geolocationEnabled = true;
	dashboardData.weatherLoading = true;
    // get location and call weather api

    console.log(dashboardData.weatherLoading);

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





app.directive('helloWorld', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: '<h3>Hello World!!</h3>'
  };
});