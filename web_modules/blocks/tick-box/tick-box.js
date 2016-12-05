import $ from 'jquery';
import 'font-awesome';

import './tick-box.styl';

$(() => {
  $('.tick-box').on('click', function callback() {
    $(this).find('.tick-box__input').trigger('click');
  });

  $('.tick-box__input[type=checkbox]').on('click', function callback(event) {
    event.stopPropagation();
    $(this).parent().toggleClass('tick-box_state_on tick-box_state_off');
  });

  let $previousRadio = null;

  $('.tick-box__input[type=radio]').on('click', function callback(event) {
    event.stopPropagation();
    if ($previousRadio !== null) {
      $previousRadio.parent().toggleClass('tick-box_state_on tick-box_state_off');
    }
    $previousRadio = $(this);
    $(this).parent().toggleClass('tick-box_state_on tick-box_state_off');
  });
});
