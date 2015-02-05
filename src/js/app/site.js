$(function() {
	var $selectOverlay = $('.select-overlay');

    $('select').on('change', function(){
        $self=$(this);
        $selectOverlay.text($self.val());
    });

    $('.form-submit').on('click', function() {
    	$selectOverlay.text('Priority');
    });
});