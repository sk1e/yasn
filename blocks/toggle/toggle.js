import $ from 'jquery';

$(() => {
  $('.toggle').on('click', function callback() {
    $(this).toggleClass('toggle_state_on toggle_state_off');
  });
});
