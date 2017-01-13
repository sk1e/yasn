import $ from 'jquery';

import '../link';
import '../tick-box-field';
import '../temptation';
import '../birthday-dropdowns';
import '../tooltiped-input';
import '../stages';
import '../button';
import {
  requiredValidator,
  emailValidator,
  makeMinLengthValidator,
  makeMatchingPasswordValidator,
  composeFieldValidator,
} from '../tooltiped-input/validators';

import './sign-up.styl';

const pagesNumber = 4;

const SignUp = class {
  constructor() {
    this.$joinButton = $('.js-sign-up__join-button');
    this.$container = $('.js-sign-up__sections-container');
    this.$nextButton = $('.js-sign-up__form-button');

    const $firstSectionTooltipedInputs = $('.js-sign-up__first-section-tooltiped-input');

    const passwordInputNode = $firstSectionTooltipedInputs.eq(1).find('input')[0];

    const firstPageFieldValidators =
            [[requiredValidator, makeMinLengthValidator(3)],
             [requiredValidator, makeMinLengthValidator(6)],
             [requiredValidator, makeMatchingPasswordValidator(() => passwordInputNode.value)]]
            .map((fs, i) => composeFieldValidator($firstSectionTooltipedInputs.eq(i), fs));

    const $emailTooltipedInput = $('.js-sign-up__email-tooltiped-input');

    const emailFieldValidator = composeFieldValidator($emailTooltipedInput,
                                                      [requiredValidator, emailValidator]);

    this.page = 0;
    this.pageValidators = [firstPageFieldValidators, [emailFieldValidator]]
      .map(fs => () => fs.map(f => f()).every(x => x));
  }

  attachEventHandlers() {
    this.$joinButton.on('click', this.transformToTempted.bind(this));
    this.$nextButton.on('click', this.moveToNextPage.bind(this));
  }

  moveToNextPage(event) {
    event.preventDefault();
    const pageValidator = this.pageValidators[this.page];

    if (!pageValidator || pageValidator()) {
      if (this.page === pagesNumber - 1) {
        return;
      }
      this.page += 1;
      this.$container.css('transform', `translateX(-${(1 / pagesNumber) * 100 * this.page}%)`);

      $('.js-sign-up__stages').triggerHandler('move-to-next-stage:', this.page);

      if (this.page === pagesNumber - 1) {
        this.$nextButton.addClass('button_hidden');
      }
    }
  }

  transformToTempted() {
    this.$joinButton.triggerHandler('collapse:');
    $('.js-sign-up__form').addClass('sign-up__form_tempted');
    $('.js-sign-up').addClass('sign-up_tempted');
    $('.js-sign-up__join-message').addClass('sign-up__join-message_transparent')
      .on('transitionend', () => {
        $('.js-sign-up__join').addClass('sign-up__join_removed');
        $('.js-sign-up__stages').addClass('sign-up__stages_opaque');
        this.$nextButton.addClass('sign-up__form-button_opaque');
        $('.js-sign-up__first-section-tooltiped-input').addClass('sign-up__first-section-tooltiped-input_opaque');
      });
  }
};

$(() => {
  const signUp = new SignUp();
  signUp.attachEventHandlers();
});

