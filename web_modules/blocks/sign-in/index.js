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
        $('.sign-in .tooltip').eq(1).removeClass('tooltip_hidden');
        $('.sign-in .tooltip__text').eq(1).text('invalid user/password');
      } else {
        this.wantsSignIn = true;
        this.$signIn.trigger('wants-to-sign-in:');
        $('.sign-in .button').addClass('button_wants-sign-in').removeClass('button_theme_light-2').addClass('button_theme_dark-2');
      }
    });
  }
};

$(() => {
  const signIn = new SignIn($('.sign-in'));
  signIn.attachEventHandlers();
});

