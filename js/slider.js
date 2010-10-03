jQuery(document).ready(function($) {

  var anchor = window.location.hash;
  
  if(anchor) {
    $("#about").hide();
    $("#contact").hide();    
    $(anchor).show();
  }
  
  
  $(".slider a.contact").click(function () {
    // show the target of the link and hide others (switch to the other slide)
    $("#about").hide();
    $("#contact").fadeIn();
    window.location.hash = '#contact';
    return false;
  });

  $(".slider a.info").click(function () {
    // show the target of the link and hide others (switch to the other slide)
    $("#contact").hide();
    $("#about").fadeIn();
    window.location.hash = '#about';
    return false;
  });

});