import $ from 'jquery';

import './tooltip.styl';


const Tooltip = class {
  constructor($tooltip) {
    this.$tooltip = $tooltip;
    this.$text = $tooltip.find('.tooltip__text');
  }

  attachEventHandlers() {
    this.$tooltip
      .on('show:', () => this.$tooltip.removeClass('tooltip_hidden'))
      .on('hide:', () => this.$tooltip.addClass('tooltip_hidden'))
      .on('set-text:', (_, value) => this.$text.text(value));
  }
};

$(() => {
  $('.tooltip').each((_, node) => {
    const tooltip = new Tooltip($(node));
    tooltip.attachEventHandlers();
  });
});

