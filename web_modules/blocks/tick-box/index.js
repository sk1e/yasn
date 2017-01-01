import $ from 'jquery';
import 'font-awesome';

import './tick-box.styl';

const RadioTickBoxContainer = class {
  constructor($containerDiv) {
    this.$radios = $containerDiv.find('.tick-box__input[type=radio]');
    this.$previousRadio = null;
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
    this.$tickBoxInput = $tickBox.find('.tick-box__input');
  }

  attachEventHandlers() {
    this.$tickBox.on('click', () => this.$tickBoxInput.trigger('click'));
  }
};


$(() => {
  $('.tick-box').each((_, node) => {
    const tickBox = new TickBox($(node));
    tickBox.attachEventHandlers();
  });

  $('.tick-box__input[type=checkbox]').each((_, node) => {
    const checkTickBox = new CheckTickBox($(node));
    checkTickBox.attachEventHandlers();
  });

  // container > tick-box-field > tick-box > tick-box__input
  $('.tick-box__input[type=radio]').parent().parent().parent()
    .each((_, node) => {
      const container = new RadioTickBoxContainer($(node));
      container.attachEventHandlers();
    });
});

