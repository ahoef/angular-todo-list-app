// (function(angular) {
// 	'use strict';
// 	// var completed = false;

// 	angular.module('todoApp', [])
// 	.controller('mainController', mainController);

// 	function mainController() {
// 		this.todos = ['Item 1', 'Item 2', 'Item 3'];
// 	}

// 	mainController.prototype.addTodo = function(todo) {
// 		this.todos.push(todo);
// 		console.log('todo before empty string: ' + todo);

// 		todo = "";
// 		console.log('todo after empty string: ' + todo);
// 		console.log(this.todos);
// 	};

// 	mainController.prototype.completeTodo = function(todo) {
// 		// console.log(completed);
// 		// var completed = true;
// 		// console.log(completed);
// 		console.log('test');
// 	}

// 	mainController.prototype.removeTodo = function(todo) {
// 		var index = this.todos.indexOf(todo);
// 		this.todos.splice(index, 1);
// 	}


// })(window.angular);

(function(angular) {
	'use strict';
	// var completed = false;

	angular.module('todoApp', ['ui.sortable'])
	.controller('mainController', ['$scope', mainController]);

	function mainController($scope) {
		$scope.todos = ['Item 1', 'Item 2', 'Item 3'];	

	$scope.$watch('todos', function () {

	    var lastItem = $scope.todos.length -1,
	  		lastEl = $scope.todos[lastItem];

		if(lastEl === "" || lastEl === undefined || lastEl === null) {
		  	$scope.todos.pop();
		}
	}, true);

	 $scope.addTodo = function(todo) {
	 	console.log('inside addTodo');
	    $scope.todos.push(todo);
	    $scope.todo = '';
	};

	$scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
      console.log($scope.todos);
    };

    $scope.completeTodo = function (todo) {
    	console.log($scope.todos);
    	return;
    	// var $scope.todos.completed = false;
    	// console.log($scope.todos.completed);
    	// return;
    	// console.log('yo!');
    	// console.log(index);
    }

}

})(window.angular);


