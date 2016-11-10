$('.button')
    .on('mousedown', function (event) {
        $(this).addClass("button_shadow_none")
    })
    .on('mouseup', function (event) {
        $(this).removeClass("button_shadow_none")
    })
    .on('mouseout', function (event) {
        $(this).removeClass("button_shadow_none")
    })

    .on('click', function (event) {
        event.preventDefault();
        
        var $div = $('<div/>'),
            btnOffset = $(this).offset(),
      	    xPos = event.pageX - btnOffset.left,
      	    yPos = event.pageY - btnOffset.top;      
        
        $div.addClass('ripple-effect');
        $div
            .css({
                top: yPos,
                left: xPos,
            }) 
            .appendTo($(this));

        window.setTimeout(function(){
            $div.remove();
        }, 1000);
    });


