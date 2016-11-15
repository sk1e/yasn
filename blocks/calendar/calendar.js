'use strict';

$(function () {

    $('.calendar').each(function () {
        $('.calendar__widget', $(this)).datepicker({
            changeYear: false,
            altField: $('.calendar__day', $(this)),
            altFormat: "d",
            firstDay: 1,
            dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            showButtonPanel: true
        })
    })
})
