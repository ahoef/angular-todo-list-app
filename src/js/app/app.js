(function(angular) {
	'use strict';
	// var completed = false;

	angular.module('todoApp', [])
	.controller('mainController', mainController);

	function mainController() {
		this.todos = ['Item 1', 'Item 2', 'Item 3'];
	}

	mainController.prototype.addTodo = function(todo) {
		this.todos.push(todo);
		console.log('todo before empty string: ' + todo);

		todo = "";
		console.log('todo after empty string: ' + todo);
		console.log(this.todos);
	};

	mainController.prototype.completeTodo = function(todo) {
		// console.log(completed);
		var completed = true;
		console.log(completed);
	}

	mainController.prototype.removeTodo = function(todo) {
		var index = this.todos.indexOf(todo);
		this.todos.splice(index, 1);
	}


})(window.angular);


