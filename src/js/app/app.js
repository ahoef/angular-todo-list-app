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
			    $('.select-overlay').text('Priority');
			    // console.log($scope.todos);
			};

			$scope.removeTodo = function(index) {
			    $scope.todos.splice(index, 1);
		    };

		    $scope.completeTodo = function(todo) {
		    	todo.completed = true;
		    }

		});

})(window.angular);

