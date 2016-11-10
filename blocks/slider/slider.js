"use strict"

$(function() {
    const tooltipedSlider = $(".slider_type_tooltiped")
    const tooltip = tooltipedSlider.find(".tooltip").first()
    const tooltipText = tooltip.find(".tooltip__text").first()
    
    tooltipedSlider.slider({
	slide: function(event, ui) {
	    tooltipText.text(ui.value);
	},
        start: function() {
            tooltip.removeClass("tooltip_hidden")
        },
        stop: function() {
            tooltip.addClass("tooltip_hidden")
        }
    })

    $(".slider_type_scaled").slider({range : "min"})
    
})
