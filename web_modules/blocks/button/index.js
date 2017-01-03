/* eslint-env browser */

import $ from 'jquery';

import './button.styl';


const Button = class {
  constructor($button) {
    this.$button = $button;
  }

  attachEventHandlers() {
    this.$button
      .on('mousedown', () => this.$button.addClass('button_shadow_none'))
      .on('mouseup', () => this.$button.removeClass('button_shadow_none'))
      .on('mouseout', () => this.$button.removeClass('button_shadow_none'))
      .on('click', this.showRippleEffect.bind(this))
      .on('invert-theme:', (_, themeNumber) => {
        this.$button.toggleClass(`button_theme_dark-${themeNumber} button_theme_light-${themeNumber}`);
      })
      .on('collapse:', () => this.$button.addClass('button_collapsed'))
      .on('hide:', () => this.$button.addClass('button_hidden'));
  }

  showRippleEffect(event) {
    const $div = $('<div/>');
    const offset = this.$button.offset();
    const xPos = event.pageX - offset.left;
    const yPos = event.pageY - offset.top;

    $div.addClass('button__ripple-effect');
    $div
      .css({
        top: yPos,
        left: xPos,
      })
      .appendTo(this.$button);

    window.setTimeout(() => {
      $div.remove();
    }, 1000);
  }
};

$(() => {
  $('.button').each((_, node) => {
    const button = new Button($(node));
    button.attachEventHandlers();
  });
});

