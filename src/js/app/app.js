(function(angular) {
	'use strict';


	angular.module('todoApp', ['ui.sortable', 'LocalStorageModule'])

  		.controller('mainController', function($scope, $filter, localStorageService, $http, $rootScope) {

			var todosInStore = localStorageService.get('todos');

			$scope.todos = todosInStore || [];

			$scope.$watch('todos', function () {
				localStorageService.set('todos', $scope.todos);

			    var lastIndex= $scope.todos.length -1,
			  		lastEl = $scope.todos[lastIndex];

				if(lastEl === "" || lastEl === undefined || lastEl === null) {
				  	$scope.todos.pop();
				}
			}, true);

			$scope.addTodo = function(todo) {
			    $scope.todos.push(todo);
			    $scope.todo = '';
			};

			$scope.removeTodo = function(index) {
			    $scope.todos.splice(index, 1);
		    };

		    $scope.completeTodo = function(todo) {
		    	todo.completed = true;
		    }

		    $scope.sortTodos = function() {
		    	$scope.todos = $filter('orderBy')($scope.todos, 'priority');
		    }



		    // Get and set current date and time

		    $scope.getDate = function() {
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

		    $scope.date = $scope.getDate().date;
		    $scope.time = $scope.getDate().time;



		    // Get location and call weather api
		    $scope.getWeather = function() {

			   	navigator.geolocation.getCurrentPosition(function(position){
			        	$scope.position = position;
			   			$rootScope.$broadcast('location-found');
			    });

				$scope.$on('location-found', function() {
					var latitude = $scope.position.coords.latitude;
				    var longitude = $scope.position.coords.longitude;
				    var response = $http.get('http://api.wunderground.com/api/26f1bcbadc87fe35/conditions/forecast/alert/q/'+latitude+','+longitude+'.json');
				    // var data = response.$$state.value.data;
				    console.log(response);

				    return response;

				});

			//http://stackoverflow.com/questions/28146491/angular-http-returns-state-object

			}

			$scope.temp = $scope.getWeather();

		});

})(window.angular);

