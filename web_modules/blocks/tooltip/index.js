import $ from 'jquery';

import './tooltip.styl';


const Tooltip = class {
  constructor($tooltip) {
    this.$tooltip = $tooltip;
    this.$text = $tooltip.find('.js-tooltip__text');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$tooltip
      .on('show:', () => this.$tooltip.removeClass('tooltip_hidden'))
      .on('hide:', () => this.$tooltip.addClass('tooltip_hidden'))
      .on('set-text:', (_, value) => this.$text.text(value))
      .on('switch-theme:', (_, value) => this.$tooltip
          .removeClass(`tooltip_theme_dark-${value === 1 ? 2 : 1}`)
          .addClass(`tooltip_theme_dark-${value}`));
  }
};

$(() => {
  $('.js-tooltip').each((_, node) => {
    new Tooltip($(node)); // eslint-disable-line no-new
  });
});

