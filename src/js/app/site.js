$(function() {
	var $selectOverlay = $('.select-overlay');

    //fake overlay for priority drop down
    $('select').on('change', function(){
        $self=$(this);
        $selectOverlay.text($self.val());
    });

    $('.form-submit').on('click', function() {
    	$selectOverlay.text('Priority');
    });
});