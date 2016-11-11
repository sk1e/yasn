'use strict'

$(function () {
    $('.toggle').on('click', function (event) {
        $(this).toggleClass("toggle_state_on toggle_state_off")
    })
})
