import $ from 'jquery';
import 'font-awesome.css';

import '../tooltip';
import '../user-photo';
import './user-profile.styl';


const UserProfile = class {
  constructor($userProfile) {
    this.$userProfile = $userProfile;
  }

  render() {
    const $tooltip = this.$userProfile.find('.js-user-profile__tooltip');
    const fontSize = parseInt($('html').css('font-size'), 10);
    $tooltip.css('bottom', `calc(50% - ${$tooltip.height() / 2 / fontSize}rem)`);
  }
};


$(() => {
  $('.js-user-profile').each((_, node) => {
    const userProfile = new UserProfile($(node));
    userProfile.render();
  });
});
