import $ from 'jquery';

import './toggle.styl';

const Toggle = class {
  constructor($toggle) {
    this.$toggle = $toggle;
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$toggle.on('click', () => this.$toggle.toggleClass('toggle_state_on toggle_state_off'));
  }
};

$(() => {
  $('.js-toggle').each((_, node) => {
    new Toggle($(node)); // eslint-disable-line no-new
  });
});
