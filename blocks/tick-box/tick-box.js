const $ = require('jquery');

$(() => {
  $('.tick-box').on('click', function callback(event) {
    $(this).toggleClass('tick-box_state_on tick-box_state_off');
    const input = $(this).find('.tick-box__input')[0];

    if (event.target !== input) {
      // filters clicks on label, checkbox is already toggled if clicked on linked label
      input.checked = !input.checked;
    }
  });
});
