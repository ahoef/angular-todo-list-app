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