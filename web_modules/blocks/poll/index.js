import $ from 'jquery';

import '../pie-chart';
import '../tick-box-field';
import '../button';
import '../input-tooltip';
import './poll.styl';

const Poll = class {
  constructor($poll) {
    this.$poll = $poll;
    this.$form = $poll.find('.js-poll__form');

    this.$voteButton = $poll.find('.js-poll__vote-button');
    this.$voteButtonTooltip = $poll.find('.js-poll__vote-button-tooltip');

    this.$tickBoxFields = $poll.find('.js-poll__tick-box-field');
    this.$tickBoxInputs = $poll.find('.js-tick-box__input');

    this.$selectedTickBoxField = null;
    this.radioWasSelected = false;
  }

  get $selectedTickBoxLabel() {
    return $(`label[for='${this.$selectedTickBoxField.find('.js-tick-box__input')[0].id}']`);
  }

  get selectedTickBoxIndex() {
    return this.$tickBoxFields.index(this.$selectedTickBoxField);
  }

  attachEventHandlers() {
    this.$form.on('submit', this.submitVote.bind(this));
    this.$tickBoxInputs.one('click', (event) => {
      event.stopPropagation();
      if (!this.radioWasSelected) {
        this.radioWasSelected = true;
        this.$voteButton.triggerHandler('invert-theme:', 2);
        this.$voteButtonTooltip.triggerHandler('hide:');
      }
    });

    const poll = this;
    this.$tickBoxInputs.on('click', function callback() {
      poll.$selectedTickBoxField = $(this).parent().parent();
    });
  }

  submitVote(event) {
    event.preventDefault();
    if (this.$selectedTickBoxField === null) {
      this.$voteButtonTooltip.triggerHandler('show:');
    } else {
      const count = $('.js-poll__votes-number');
      count.text(+count.text() + 1);

      this.$voteButton.triggerHandler('hide:');
      this.$poll.find('.js-poll__items').addClass('poll__items_hidden');

      this.$poll.find(`.js-poll__legend-item-text:contains("${this.$selectedTickBoxLabel.text()}")`)
        .addClass('poll__legend-item-text_chosen');

      this.$poll.find('.js-poll__pie-chart').triggerHandler('add-1-for-index:', this.selectedTickBoxIndex);
    }
  }
};

$(() => {
  $('.js-poll').each((_, node) => {
    const poll = new Poll($(node));
    poll.attachEventHandlers();
  });
});
