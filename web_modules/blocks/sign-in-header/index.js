import $ from 'jquery';

import '../header';
import '../sign-in';

import './sign-in-header.styl';

const SignInHeader = class {
  constructor($signInHeader) {
    this.$signInHeader = $signInHeader;
    this.$header = $signInHeader.find('.js-sign-in-header__header');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$signInHeader.on('wants-to-sign-in:', () => {
      this.$header.addClass('header_wants-sign-in');
    });
  }
};

$(() => {
  new SignInHeader($('.js-sign-in-header')); // eslint-disable-line no-new
});

