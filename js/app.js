/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).bind('pageinit',function(){
    var slideWidth = $(window).width();
    var slides = $('.slide');
    var numberOfSlides = slides.length;
    var position = 0;
                
    manageControls();
    $("#num-slide").html(position+1);
                
    // Wrap all .slides with #slideInner div
    slides.wrapAll('<div id="slideInner"></div>').css({
        'display' : 'inline-block',
        'width' : slideWidth
    });
                
    // Set #slideInner width equal to total width of all slides
    $('#slideInner').css('width', slideWidth * numberOfSlides);
    $('#slideInner').css('height', 748);
                
    $(document).bind('vmouseup',evMouseUp);
    $("#btn_left").bind('tap', evLeft);
    $("#btn_right").bind('tap', evRight);
    $("#contenido li").bind('tap', evContenido)
    $("#btn-inicio").bind('tap', evInicio);
                
    var currentScroll = 0;
    $(document).bind('vmousedown', function(e){
        currentScroll = $("#slidesContainer").scrollLeft();
    });
                
                            
    $("#btn_menu").bind('tap', function(){
        $("#menu").toggle();
    });
                
    function manageControls(){
        $("#btn_left").css('opacity','1');
        $("#btn_right").css('opacity','1');
                	
        if (position == 0){
            $("#btn_left").css('opacity','0.5');
        }
        else if (position >= numberOfSlides-1){
            $("#btn_right").css('opacity','0.5');
        }
    }
                
    function evRight(){
        if (position < numberOfSlides-1){
            position++;
            goToPage(position);
        }
    }
                
    function evLeft(){
        if (position > 0){
            position--;
            goToPage(position);
        }
    }
                
    function evContenido(){
        position = parseInt($(this).attr("rel"));
        goToPage(position);
        $("#contenido").hide();
    }
                
    function evInicio(){
        position = 0;
        goToPage(position);
    }
                    
    function evMouseUp(){
        if ($("#slidesContainer").scrollLeft() > currentScroll){
            var pos = ($("#slidesContainer").scrollLeft() + slideWidth)/slideWidth;
        }else
        if ($("#slidesContainer").scrollLeft() < currentScroll){
            var pos = ($("#slidesContainer").scrollLeft() - slideWidth)/slideWidth;
        }else{
            return false;
        }
                    
        if (pos < 0){
            pos = 0;
        }
        if (pos > numberOfSlides-1){
            pos = numberOfSlides-1;
        }
        position = Math.round(pos);
        goToPage(position);
             
    }
                
                
    function goToPage(page){
        $(document).unbind('vmouseup');
        $("#btn_left").unbind('tap');
        $("#btn_right").unbind('tap');
        $("#contenido li").unbind('tap');
        $("#btn-inicio").unbind('tap');
                
        manageControls();
        $("#slidesContainer").animate({
            scrollLeft:slideWidth*page
            },500,'easeOutQuint',function(){
            $(document).bind('vmouseup',evMouseUp);
            $("#btn_left").bind('tap', evLeft);
            $("#btn_right").bind('tap', evRight);
            $("#contenido li").bind('tap', evContenido)
            $("#btn-inicio").bind('tap', evInicio);
        });
        $("#num-slide").html(page+1);
    }
                
                
                
    $("#btn-menu").bind('tap', function(){
        $("#contenido").toggle();
    });
                
    $("#slidesContainer").bind('tap', function(){
        $("#menu-bar").toggle();
        $("#slider-footer").toggle();
        $("#contenido").hide();
    });
                
    var contador = 0;
    $(".slide").each(function(){
        contador++;
        $(this).load('html/page'+contador+'.html');
    });
});

