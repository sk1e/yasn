import $ from 'jquery';

import '../pie-chart';
import '../tick-box-field';
import '../button';
import '../input-tooltip';
import './poll.styl';

const Poll = class {
  constructor($poll) {
    this.$poll = $poll;
    this.$form = $poll.find('form');

    this.$voteButton = $poll.find('.button');
    this.$voteButtonTooltip = $poll.find('.button + .tooltip');

    this.$tickBoxInputs = $poll.find('.tick-box__input');
    this.$tickBoxFields = $poll.find('.tick-box-field');

    this.$selectedTickBoxField = null;
    this.radioWasSelected = false;
  }

  get $selectedTickBoxLabel() {
    return $(`label[for='${this.$selectedTickBoxField.find('.tick-box__input')[0].id}']`);
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
      const count = $('.poll__legend-votes-count span').eq(1);
      count.text(+count.text() + 1);

      this.$voteButton.triggerHandler('hide:');
      this.$poll.find('.poll__items').addClass('poll__items_hidden');

      this.$poll.find(`.poll__legend-item-text:contains("${this.$selectedTickBoxLabel.text()}")`)
        .addClass('poll__legend-item-text_chosen');

      this.$poll.find('.poll__chart .pie-chart').triggerHandler('add-1-for-index:', this.selectedTickBoxIndex);
    }
  }
};

$(() => {
  $('.poll').each((_, node) => {
    const poll = new Poll($(node));
    poll.attachEventHandlers();
  });
});
