
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
  const $tooltip = $tooltipedInput.find('.js-tooltiped-input__tooltip');
  const inputNode = $tooltipedInput.find('.js-tooltiped-input__input')[0];

  let invariantWasBroken = false;
  return function validate() {
    function loop(validators) {
      if (validators.length === 0) {
        if (invariantWasBroken) {
          $tooltip
            .triggerHandler('switch-theme:', 1)
            .triggerHandler('set-text:', 'ok now');
        }
        return true;
      }
      const [x, ...xs] = validators;
      const isValid = x(inputNode);
      if (isValid !== true) {
        invariantWasBroken = true;
        $tooltip
          .triggerHandler('show:')
          .triggerHandler('switch-theme:', 2)
          .triggerHandler('set-text:', isValid);
        return false;
      }
      return loop(xs);
    }
    return loop(fieldValidators);
  };
}

