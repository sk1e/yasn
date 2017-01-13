import $ from 'jquery';
import 'font-awesome.css';

import './tick-box.styl';

const RadioTickBoxContainer = class {
  constructor($containerDiv) {
    this.$radios = $containerDiv.find('.js-tick-box__input[type=radio]');
    this.$previousRadio = null;
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    const container = this;
    this.$radios.on('click', function callback(event) {
      event.stopPropagation();
      if (container.$previousRadio !== null) {
        container.$previousRadio.parent().toggleClass('tick-box_state_on tick-box_state_off');
      }
      container.$previousRadio = $(this);
      $(this).parent().toggleClass('tick-box_state_on tick-box_state_off');
    });
  }
};

const CheckTickBox = class {
  constructor($tickBoxInput) {
    this.$tickBox = $tickBoxInput.parent();
    this.$tickBoxInput = $tickBoxInput;
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$tickBoxInput.on('click', (event) => {
      event.stopPropagation();
      this.$tickBox.toggleClass('tick-box_state_on tick-box_state_off');
    });
  }
};

const TickBox = class {
  constructor($tickBox) {
    this.$tickBox = $tickBox;
    this.$tickBoxInput = $tickBox.find('.js-tick-box__input');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$tickBox.on('click', () => this.$tickBoxInput.trigger('click'));
  }
};


$(() => {
  $('.js-tick-box').each((_, node) => {
    new TickBox($(node)); // eslint-disable-line no-new
  });

  $('.js-tick-box__input[type=checkbox]').each((_, node) => {
    new CheckTickBox($(node)); // eslint-disable-line no-new
  });

  // container > tick-box-field > tick-box > tick-box__input
  $('.js-tick-box__input[type=radio]').parent().parent().parent()
    .each((_, node) => {
      new RadioTickBoxContainer($(node)); // eslint-disable-line no-new
    });
});

