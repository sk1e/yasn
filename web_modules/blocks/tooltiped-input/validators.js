
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


export function composeFieldValidator($tooltipedInput, fieldValidators) {
  const $tooltipText = $tooltipedInput.find('.tooltip__text');
  const inputNode = $tooltipedInput.find('.input')[0];
  const $tooltipBody = $tooltipText.parent();
  const $tooltip = $tooltipBody.parent();

  let invariantWasBroken = false;
  return function validate() {
    function loop(validators) {
      if (validators.length === 0) {
        if (invariantWasBroken) {
          $tooltipBody.removeClass('tooltip__body_theme_dark-2').addClass('tooltip__body_theme_dark-1');
          $tooltipText.text('ok now');
        }
        return true;
      }
      const [x, ...xs] = validators;
      const isValid = x(inputNode);
      if (isValid !== true) {
        invariantWasBroken = true;
        $tooltip.removeClass('tooltip_hidden');
        $tooltipText.text(isValid);
        $tooltipBody.removeClass('tooltip__body_theme_dark-1').addClass('tooltip__body_theme_dark-2');
        return false;
      }
      return loop(xs);
    }
    return loop(fieldValidators);
  };
}

