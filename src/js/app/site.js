$(function() {
    $('select')
        .on('change', function(){
        $self=$(this);
        $('.select-overlay').text($self.val());
    });
});