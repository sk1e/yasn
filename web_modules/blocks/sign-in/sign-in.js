import $ from 'jquery';

import './sign-in.styl';

let wantsSignIn = false;

$(() => {
  $('.sign-in .button').on('click', function callback() {
    if (wantsSignIn) {
      $('.sign-in .tooltip').eq(1).removeClass('tooltip_hidden');
      $('.sign-in .tooltip__text').eq(1).text('invalid user/password');
    } else {
      wantsSignIn = true;
      $(this).addClass('button_wants-sign-in').removeClass('button_theme_light-2').addClass('button_theme_dark-2');
      $('.header').addClass('header_wants-sign-in');
    }
  });
});
