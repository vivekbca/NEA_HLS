
$(document).ready(function(){
  $(".frgt-txt").click(function(){
    $(".log-frm").addClass("hide-frm");
    $(".frgt-frm").addClass("show-frm");	
  });

  
  $(".frgt-txt1").click(function(){
    $(".frgt-frm").removeClass("show-frm");
    $(".frgt-frm1").addClass("show-frm");	
  });


  $(".back-txt").click(function(){
	$(".frgt-frm").removeClass("show-frm");  
    $(".log-frm").removeClass("hide-frm");
	$(".frgt-frm1").removeClass("show-frm");
  });

// left menu
  $('.sub-menu ul').hide();
  $('.sub-menu.active ul').show();
  $(".sub-menu a").click(function () {
    $(this).parent(".sub-menu").children("ul").slideToggle("100");
    $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
  });

//
$(".tgl-side-menu").click(function(){
  $(".left-menu").toggleClass("hide-left-menu");
  $(".main-wapper").toggleClass("full-main-wapper");
});

// $(".more-optn").click(function(){
//   $(".mr-edt").toggleClass("show-mr-edt");
// });


// pop
$(".user1").click(function(){
  $(".custom-pop").addClass("open-pop");
 $(".controllerBox").addClass("show");  
  $(".pop-video").removeClass("full-video");
});

$(".user2").click(function(){
  $(".custom-pop").addClass("open-pop");
  $(".controllerBox").removeClass("show");
  $(".pop-video").addClass("full-video");
});
$(".cls-pop").click(function(){
  $(".custom-pop").removeClass("open-pop");
});



$(".add-btn").click(function(){
  $(".new-pop").addClass("open-new-pop");
});
$(".cls-new-pop").click(function(){
  $(".new-pop").removeClass("open-new-pop");
});




//profile drop
$(".pfl-dp").click(function(){
  $(".pfl-drp").toggleClass("show-pfl-drp");
});



//tab
$('.clickme a').click(function(){
  $('.clickme a').removeClass('activelink');
  $(this).addClass('activelink');
  var tagid = $(this).data('tag');
  $('.list').removeClass('active').addClass('hide');
  $('#'+tagid).addClass('active').removeClass('hide');
});

//range-bar
$('input[type="range"]').on('input', function() {

  var control = $(this),
    controlMin = control.attr('min'),
    controlMax = control.attr('max'),
    controlVal = control.val(),
    controlThumbWidth = control.data('thumbwidth');

  var range = controlMax - controlMin;
  
  var position = ((controlVal - controlMin) / range) * 100;
  var positionOffset = Math.round(controlThumbWidth * position / 100) - (controlThumbWidth / 2);
  var output = control.next('output');
  
  output
    .css('left', 'calc(' + position + '% - ' + positionOffset + 'px)')
    .text(controlVal);

});

//colaps box

  $('.cntrl-arw').click(function(j) {
    
    var dropDown = $(this).closest('.acc__card').find('.acc__panel');
    $(this).closest('.acc').find('.acc__panel').not(dropDown).slideUp();
    
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).closest('.acc').find('.acc__title.active').removeClass('active');
      $(this).addClass('active');
     
    }
    
    dropDown.stop(false, true).slideToggle();
    j.preventDefault();
  });
});

