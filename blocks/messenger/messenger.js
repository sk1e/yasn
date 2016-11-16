'use strict';

const submitMessage = function () {
    const text = $(".messenger .text-area").get(0)
    $('.messenger__message-list').append("<div class=\"messenger__message messenger__message_self\">" + text.value + "</div>")
    text.value = ""
    
    const sv = $(".messenger__scroll-view").get(0)
    sv.scrollTo(0, sv.scrollHeight - sv.clientHeight);    
}

$(function () {
    $('.messenger .button').on('click', submitMessage)
    $(".messenger .text-area").keydown(function (e) {
        if (e.keyCode == 13)
            submitMessage()
    })
    
})
