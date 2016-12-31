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

    const $firstInputSections = $('.sign-up__section:nth-child(1) .tooltiped-input');

    const passwordInputNode = $firstInputSections.eq(1).find('input')[0];

    const firstPageFieldValidators =
            [[requiredValidator, makeMinLengthValidator(3)],
             [requiredValidator, makeMinLengthValidator(6)],
             [requiredValidator, makeMatchingPasswordValidator(() => passwordInputNode.value)]]
            .map((fs, i) => composeFieldValidator($firstInputSections.eq(i), fs));

    const $emailInputSection = $('.sign-up__section:nth-child(2) .tooltiped-input');

    const emailFieldValidator = composeFieldValidator($emailInputSection.eq(0),
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

      $('.sign-up .stages').trigger('move-to-next-stage:', this.page);

      if (this.page === pagesNumber - 1) {
        this.$nextButton.addClass('button_hidden');
      }
    }
  }

  static transformToTempted() {
    $('.sign-up__form').addClass('sign-up__form_tempted');
    $('.sign-up').addClass('sign-up_tempted');
    $('.sign-up__join > .button').addClass('button_tempted');
    $('.sign-up__join-message').addClass('sign-up__join-message_tempted')
      .on('transitionend', () => {
        $('.sign-up__join').addClass('sign-up__join_removed');
        $('.sign-up .stages').addClass('stages_tempted');
        $('.sign-up__form > .button').addClass('button_tempted');
        $('.sign-up__section').eq(0).find('.tooltiped-input').addClass('tooltiped-input_tempted');
      });
  }
};

$(() => {
  const signUp = new SignUp();
  signUp.attachEventHandlers();
});

