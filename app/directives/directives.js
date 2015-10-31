//directive for nicely styled priority dropdown menu
app.directive('fakeDropdown', function() {
  	return {
      	restrict: 'AE',
      	templateUrl: './app/views/partials/fakeDropdown.html',
      	link: function(scope, elem, attrs) {

			var $selectOverlay = $('.select-overlay');

		    $('select').on('change', function(){
		        var $self=$(this);
		        $selectOverlay.text($self.val());
		    });

		    $('.form-submit').on('click', function() {
		    	$selectOverlay.text('Priority');
		    });
	    }
  	};
});