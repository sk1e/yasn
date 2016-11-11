'use strict'

$(function () {
    console.log("load")
    $('.toggle').on('click', function (event) {
        
        if ($(this).hasClass('toggle_state_on')) {
            $(this).removeClass('toggle_state_on')
            $(this).addClass('toggle_state_off')            
        } else {
            $(this).removeClass('toggle_state_off')
            $(this).addClass('toggle_state_on')            
        }
    })
})
