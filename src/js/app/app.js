(function(angular) {
  'use strict';

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

})(window.angular);


