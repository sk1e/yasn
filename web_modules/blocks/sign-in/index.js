import $ from 'jquery';

import './sign-in.styl';


const SignIn = class {
  constructor($signIn) {
    this.$signIn = $signIn;
    this.wantsSignIn = false;
  }

  attachEventHandlers() {
    this.$signIn.on('submit', (event) => {
      event.preventDefault();
      if (this.wantsSignIn) {
        $('.sign-in .tooltip').eq(1)
          .triggerHandler('show:')
          .triggerHandler('set-text:', 'invalid user/password');
      } else {
        this.wantsSignIn = true;
        this.$signIn.trigger('wants-to-sign-in:');
        $('.sign-in__button').addClass('sign-in__button_wants-sign-in').triggerHandler('invert-theme:', 2);
      }
    });
  }
};

$(() => {
  const signIn = new SignIn($('.sign-in'));
  signIn.attachEventHandlers();
});

