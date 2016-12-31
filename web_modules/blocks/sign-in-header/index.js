import $ from 'jquery';

import '../header';
import '../sign-in';

import './sign-in-header.styl';

const SignInHeader = class {
  constructor($signInHeader) {
    this.$signInHeader = $signInHeader;
    this.$header = $signInHeader.find('.header');
  }

  attachEventHandlers() {
    this.$signInHeader.on('wants-to-sign-in:', () => {
      this.$header.addClass('header_wants-sign-in');
    });
  }
};

$(() => {
  const signInHeader = new SignInHeader($('.sign-in-header'));
  signInHeader.attachEventHandlers();
});

