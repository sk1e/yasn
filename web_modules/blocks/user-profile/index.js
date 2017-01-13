import $ from 'jquery';
import 'font-awesome.css';

import '../tooltip';
import '../user-photo';
import './user-profile.styl';


const UserProfile = class {
  constructor($userProfile) {
    this.$userProfile = $userProfile;
    this.render();
  }

  render() {
    const $tooltip = this.$userProfile.find('.js-user-profile__tooltip');
    const fontSize = parseInt($('html').css('font-size'), 10);
    $tooltip.css('bottom', `calc(50% - ${$tooltip.outerHeight() / 2 / fontSize}rem)`);
  }
};


$(() => {
  $('.js-user-profile').each((_, node) => {
    new UserProfile($(node)); // eslint-disable-line no-new
  });
});
