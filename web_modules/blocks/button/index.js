/* eslint-env browser */

import $ from 'jquery';

import './button.styl';

$('.button')
  .on('mousedown', function callback() {
    $(this).addClass('button_shadow_none');
  })
  .on('mouseup', function callback() {
    $(this).removeClass('button_shadow_none');
  })
  .on('mouseout', function callback() {
    $(this).removeClass('button_shadow_none');
  })

  .on('click', function callback(event) {
    const $div = $('<div/>');
    const offset = $(this).offset();
    const xPos = event.pageX - offset.left;
    const yPos = event.pageY - offset.top;

    $div.addClass('button__ripple-effect');
    $div
      .css({
        top: yPos,
        left: xPos,
      })
      .appendTo($(this));

    window.setTimeout(() => {
      $div.remove();
    }, 1000);
  });
