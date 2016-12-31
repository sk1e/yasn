
export function makeValidator(predicate, message) {
  return input => predicate(input) || message;
}

export function makeRegexValidator(regex, message) {
  return input => regex.test(input.value) || message;
}

export function makeMatchingPasswordValidator(passwordGetter) {
  return makeValidator(repeatInput => repeatInput.value === passwordGetter(), 'passwords do not match');
}

export function makeMinLengthValidator(length) {
  return makeValidator(input => input.value.length >= length, `must be at least ${length} characters long`);
}

export const requiredValidator = makeValidator(input => input.value !== '', 'this field is required');

const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const emailValidator = makeRegexValidator(emailRegex, 'this is not an email');


export function composeFieldValidator($tooltipedInput, validators) {
  const $tooltipText = $tooltipedInput.find('.tooltip__text');
  const inputNode = $tooltipedInput.find('.input')[0];
  let invariantWasBroken = false;
  const $tooltipBody = $tooltipText.parent();
  const $tooltip = $tooltipBody.parent();

  return function p() {
    for (const f of validators) {
      const result = f(inputNode);
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
