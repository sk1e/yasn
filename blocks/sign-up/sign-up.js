
import $ from 'jquery';
import colors from '../../colors.json';


const pagesNumber = 4;
const blockWidth = 35.71;


function makeValidator(predicate, message) {
  return input => predicate(input) || message;
}

function makeRegexValidator(regex, message) {
  return input => regex.test(input.value) || message;
}

function makeMatchingPasswordValidator(passwordInput) {
  return makeValidator(repeatInput => repeatInput.value === passwordInput.value, 'passwords do not match');
}

function makeMinLengthValidator(length) {
  return makeValidator(input => input.value.length >= length, `must be at least ${length} characters long`);
}

const requiredValidator = makeValidator(input => input.value !== '', 'this field is required');

const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const emailValidator = makeRegexValidator(emailRegex, 'this is not an email');


function composeFieldValidator(input, $tooltipText, validators) {
  let invariantWasBroken = false;
  const $tooltipBody = $tooltipText.parent();
  const $tooltip = $tooltipBody.parent();

  return function p() {
    for (const f of validators) {
      const result = f(input);
      if (result !== true) {
        invariantWasBroken = true;
        $tooltip.removeClass('tooltip_hidden');
        $tooltipText.text(result);
        $tooltipBody.removeClass('tooltip__body_theme_dark-1').addClass('tooltip__body_theme_dark-2');
        return false;
      }
    }
    if (invariantWasBroken) {
      $tooltipBody.removeClass('tooltip__body_theme_dark-2').addClass('tooltip__body_theme_dark-1');
      $tooltipText.text('ok now');
    }

    return true;
  };
}


$(() => {
  $('.sign-up__join > .button').on('click', () => {
    $('.sign-up').addClass('sign-up_tempted');
    $('.sign-up__join-message').addClass('sign-up__join-message_tempted');
    $('.sign-up__join > .button').addClass('button_tempted');

    $('.sign-up__join-message').on('transitionend', () => {
      $('.sign-up__join').addClass('sign-up__join_removed');
      $('.sign-up .stages').addClass('stages_tempted');
    });

    const container = $('.sign-up__blocks-container');

    const $firstInputBlocks = $('.sign-up__block:nth-child(1) .input');
    const $firstTooltips = $firstInputBlocks.find('.tooltip__text');
    const $firstInputs = $firstInputBlocks.find('input');

    const firstPageFieldValidators =
            [[requiredValidator],
             [requiredValidator, makeMinLengthValidator(6)],
             [requiredValidator, makeMatchingPasswordValidator($firstInputs[1])]]
            .map((fs, i) => composeFieldValidator($firstInputs[i], $firstTooltips.eq(i), fs));

    const $emailInputBlock = $('.sign-up__block:nth-child(2) .input');
    const $emailTooltip = $emailInputBlock.find('.tooltip__text');
    const $emailInput = $emailInputBlock.find('input');

    const emailFieldValidator = composeFieldValidator($emailInput[0],
                                                      $emailTooltip,
                                                      [requiredValidator, emailValidator]);

    let page = 0;
    const pageValidators = [firstPageFieldValidators, [emailFieldValidator]]
            .map(fs => () => fs.map(f => f()).every(x => x));

    $('.sign-up > .button').on('click', function callback() {
      const pageValidator = pageValidators[page];
      if (!pageValidator || (pageValidator && pageValidator())) {
        page += 1;
        container.css('transform', `translateX(-${blockWidth * page}rem)`);

        $('.sign-up .stages').css('background', `linear-gradient(to right, ${colors['theme-color-2']} ${(page / (pagesNumber - 1)) * 100}%, ${colors['theme-color-3']} 0%)`);
        $('.sign-up .stages__stage_face_incomplete').first()
          .removeClass('stages__stage_face_incomplete')
          .addClass('stages__stage_face_complete');

        if (page === pagesNumber - 1) {
          $(this).addClass('button_hidden');
        }
      }
    });
  });
});
