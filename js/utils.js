var slideWidth, slides, numberOfSlides, position, currentScroll, maxLeft, btnWidth;
var slideInnerHeight = 511;
var numSlides = 1;
var tools = {
    manageControls : function (){
        $("#btn_left").css('opacity','1');
        $("#btn_right").css('opacity','1');
                	
        if (position == 0){
            $("#btn_left").css('opacity','0.5');
        }
        else if (position >= numberOfSlides-1){
            $("#btn_right").css('opacity','0.5');
        }
    },
                
    evRight :function (){
        if (position < numberOfSlides-1){
            position++;
            tools.goToPage(position);
        }
    },
                
    evLeft :function (){
        if (position > 0){
            position--;
            tools.goToPage(position);
        }
    },
                
    evContent : function (){
        position = parseInt($(this).attr("rel"));
        tools.goToPage(position);
        $("#nav-content").hide();
    },
                
    evHome : function (){
        position = 0;
        tools.goToPage(position);
    },
                    
    evMouseUp : function (){
        if ($("#slidesContainer").scrollLeft() > currentScroll){
            var pos = ($("#slidesContainer").scrollLeft() + slideWidth)/slideWidth;
        }else{
            if ($("#slidesContainer").scrollLeft() < currentScroll){
                var pos = ($("#slidesContainer").scrollLeft() - slideWidth)/slideWidth;
            }
            else
                return false;
        }
        if (pos < 0)
            pos = 0;

        if (pos > numberOfSlides-1)
            pos = numberOfSlides-1;

        position = Math.round(pos);
        tools.goToPage(position);
             
    },
                
    goToPage : function (page){
        $(document).unbind('vmouseup');
        $("#left").unbind('tap');
        $("#right").unbind('tap');
        $("#nav-content li").unbind('tap');
        $("#btn_home").unbind('tap');
        tools.manageControls();
        $("#slidesContainer").animate({
            scrollLeft:slideWidth*page
        },500,'easeOutQuint',function(){
            $(document).bind('vmouseup',tools.evMouseUp);
            $("#left").bind('tap', tools.evLeft);
            $("#right").bind('tap', tools.evRight);
            $("#nav-content li").bind('tap', tools.evContent)
            $("#btn_home").bind('tap', tools.evHome);
        });
    //        $("#num-slide").html(page+1);
    },
    showHideMenu : function(){
        $("#menu_sections").toggle();
    },
    
    loadSlides : function (){
        var contador = 0;
        $(".slide").each(function(){
            contador++;
            $(this).load('html/page'+contador+'.html');
        });
    },
    updateScroll : function(){
        currentScroll = $("#slidesContainer").scrollLeft();
    },
    loadDraggable : function(){
        $("#btn_slider").draggable({
            containment : "parent",
            stop : function(event,ui){
                position = Math.round(ui.position.left / btnWidth);
                tools.goToPage(position);
            }
        });
    }
}
