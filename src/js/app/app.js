(function(angular) {
	'use strict';


	angular.module('todoApp', ['ui.sortable', 'LocalStorageModule'])

  		.controller('mainController', function($scope, $filter, localStorageService) {

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

		});

})(window.angular);

