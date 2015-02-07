$(function() {
	var $selectOverlay = $('.select-overlay'),
		 isDesktop = screen.width > 1024;

    //fake overlay
    $('select').on('change', function(){
        $self=$(this);
        $selectOverlay.text($self.val());
    });

    $('.form-submit').on('click', function() {
    	$selectOverlay.text('Priority');
    });

    //mobile/desktop version of sort instructions
    if (isDesktop) {
    	$('.instructions.mobile').hide();
    }
    else {
    	$('.instructions.desktop').hide();
    }


});