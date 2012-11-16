/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).bind('pageinit',function(){
    for(i=0; i< numSlides; i++){
        $('#slidesContainer').append('<div class="slide"></div>');
    }
    maxLeft = $("#barra_slider").width() - $("#btn_slider").width();
    slideWidth = $(window).width();
    slides = $('.slide');
    numberOfSlides = slides.length;
    position = 0;
    currentScroll = 0;
    btnWidth = maxLeft/numberOfSlides; 
                
    tools.manageControls();
    tools.loadSlides();
    tools.loadDraggable();
                
    // Wrap all .slides with #slideInner div
    slides.wrapAll('<div id="slideInner"></div>').css({
        'display' : 'inline-block',
        'width' : slideWidth
    });
                
    // Set #slideInner width equal to total width of all slides
    $('#slideInner').css('width', slideWidth * numberOfSlides);
    $('#slideInner').css('height', slideInnerHeight);

    $(document).bind('vmouseup',tools.evMouseUp);
    $("#btn_left").bind('tap', tools.evLeft);
    $("#btn_right").bind('tap', tools.evRight);
    $("#nav-content li").bind('tap', tools.evContent);
    $("#btn_home").bind('tap', tools.evHome);
    $('#btn_menu').bind('tap', tools.showHideMenu);
    $("#content_inner li").bind('tap', tools.evOptMenu);
    $(document).bind('vmousedown', tools.updateScroll);
});
