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
import constants from './constants.json';

const pagesNumber = 4;
const sectionWidth = parseInt(constants['full-section-width'], 10);

const SignUp = class {
  constructor() {
    this.$joinButton = $('.sign-up__join > .button');
    this.$container = $('.sign-up__sections-container');
    this.$nextButton = $('.sign-up__form > .button');

    const $firstSectionInputs = $('.sign-up__section:nth-child(1) .tooltiped-input');

    const passwordInputNode = $firstSectionInputs.eq(1).find('input')[0];

    const firstPageFieldValidators =
            [[requiredValidator, makeMinLengthValidator(3)],
             [requiredValidator, makeMinLengthValidator(6)],
             [requiredValidator, makeMatchingPasswordValidator(() => passwordInputNode.value)]]
            .map((fs, i) => composeFieldValidator($firstSectionInputs.eq(i), fs));

    const $emailSectionInput = $('.sign-up__section:nth-child(2) .tooltiped-input');

    const emailFieldValidator = composeFieldValidator($emailSectionInput,
                                                      [requiredValidator, emailValidator]);

    this.page = 0;
    this.pageValidators = [firstPageFieldValidators, [emailFieldValidator]]
      .map(fs => () => fs.map(f => f()).every(x => x));
  }

  attachEventHandlers() {
    this.$joinButton.on('click', SignUp.transformToTempted);
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
      this.$container.css('transform', `translateX(-${sectionWidth * this.page}rem)`);

      $('.sign-up .stages').triggerHandler('move-to-next-stage:', this.page);

      if (this.page === pagesNumber - 1) {
        this.$nextButton.addClass('button_hidden');
      }
    }
  }

  static transformToTempted() {
    $('.sign-up__form').addClass('sign-up__form_tempted');
    $('.sign-up').addClass('sign-up_tempted');
    $('.sign-up__join > .button').triggerHandler('collapse:');
    $('.sign-up__join-message').addClass('sign-up__join-message_transparent')
      .on('transitionend', () => {
        $('.sign-up__join').addClass('sign-up__join_removed');
        $('.sign-up__stages').addClass('sign-up__stages_opaque');
        $('.sign-up__form-button').addClass('sign-up__form-button_opaque');
        $('.sign-up__first-section-tooltiped-input').addClass('sign-up__first-section-tooltiped-input_opaque');
      });
  }
};

$(() => {
  const signUp = new SignUp();
  signUp.attachEventHandlers();
});

