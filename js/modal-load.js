/*$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");},
     ajaxStop: function() { $body.removeClass("loading"); }    
});*/

function modalResize() {
	var screen;

	if ($(window).width() < $(window).height()*0.8) 
  		screen = $(window).width();
  	else 
  		screen = $(window).height()*0.8;

	$('.modal_content').width(screen * 0.84);
	// Изобраение брейнсканнера и текст

    $('.modal_text, .button_modal').css('font-size', ($('.modal_icon').height() + $('.modal_head').height()) * 0.11 + "px");
    $('.modal_head').css('font-size', ($('.modal_icon').height() + $('.modal_head').height()) * 0.15 + "px");
}
