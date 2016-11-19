
console.log("---------------------- hey")


$(function() {
    console.log("---------------------- here")
    const slider = $(".slider_type_tooltiped")
    const tooltipText = slider.find(".tooltip__text")
    
    slider.slider({
	slide: function(event, ui) {
	    tooltipText.text(ui.value)
	},
    })
    
    $(".slider_type_scaled").slider({range : "min"})    
})
