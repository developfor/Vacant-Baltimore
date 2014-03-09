// (function ( $ ) {

function clickInfo(){
var last;
$('#info-button, #embed-button, #embed-close, #info-close').on('click', function(){
  var current = $(this).attr("id").split('-')[0];
  current += "-text";
  toggles(current, last)
  last = current;

})
}//END OF CLICKINFO

function toggles(picked, last){

  $('#country-info ul').hide();

if($('#info-dropdown').is(':visible')){

  if(picked === last){
    $('#info-dropdown').slideToggle(300);
  }else{

    $('#info-dropdown').slideToggle(300, function(){
      $('#info-text').hide();
        $('#embed-text').hide();
        $('#'+picked).show();
        $('#info-dropdown').slideToggle(300);
      });
  }
}else{
  $('#info-text').hide();
     $('#embed-text').hide();
     $('#'+picked).show();
     $('#info-dropdown').slideToggle(300);
}
}

clickInfo();

// }( jQuery ));