(function(angular) {
  'use strict';

angular.module('todoApp', [])
  .controller('mainController', mainController);

  function mainController() {
	  this.todos = ['Item 1', 'Item 2', 'Item 3'];
}

mainController.prototype.addTodo = function() {
	// this part isn't working
  this.todos.push(todo);
  console.log(this.todos);
};

})(window.angular);


