import $ from 'jquery';

import './toggle.styl';

const Toggle = class {
  constructor($toggle) {
    this.$toggle = $toggle;
  }

  attachEventHandlers() {
    this.$toggle.on('click', () => this.$toggle.toggleClass('toggle_state_on toggle_state_off'));
  }
};

$(() => {
  $('.toggle').each((_, node) => {
    const toggle = new Toggle($(node));
    toggle.attachEventHandlers();
  });
});
