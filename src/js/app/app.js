(function(angular) {
	'use strict';


	angular.module('todoApp', ['ui.sortable', 'LocalStorageModule'])

  		.controller('mainController', function($scope, localStorageService) {

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
			 	console.log('addTodo was called');
			    $scope.todos.push(todo);
			    $scope.todo = '';
			};

			$scope.removeTodo = function(index) {
			    $scope.todos.splice(index, 1);
			    console.log($scope.todos);
		    };

		    $scope.completeTodo = function (todo) {
		    	$scope.todos.completed = true;
		    	console.log($scope.todos.completed);
		    }

		});

})(window.angular);

// model not binding to individual item that gets completed


