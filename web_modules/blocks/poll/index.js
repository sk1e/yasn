import $ from 'jquery';

import pieChartViewMap from '../pie-chart';
import '../tick-box-field';
import '../button';
import '../tooltip';
import './poll.styl';

$(() => {
  let $selectedTickBoxField = null;
  const $voteButton = $('.poll .button');
  const $tooltip = $('.poll .button + .tooltip');

  $('.poll form').on('submit', (event) => {
    event.preventDefault();
    if ($selectedTickBoxField === null) {
      $tooltip.removeClass('tooltip_hidden');
    } else {
      const count = $('.poll__legend-votes-count span').eq(1);
      count.text(+count.text() + 1);

      $voteButton.addClass('button_hidden');
      $('.poll__items').addClass('poll__items_hidden');

      const $label = $(`label[for='${$selectedTickBoxField.find('.tick-box__input')[0].id}']`);
      $(`.poll__legend-item-text:contains("${$label.text()}")`)
        .addClass('poll__legend-item-text_chosen');

      const pieChartView = pieChartViewMap.get($('.poll__chart .pie-chart')[0]);
      const index = $('.poll__items .tick-box-field').index($selectedTickBoxField);
      pieChartView.values = pieChartView.values.map((x, i) => (i === index ? x + 1 : x));
    }
  });

  $('.poll .tick-box__input').one('click', () => {
    $voteButton.removeClass('button_theme_light-2').addClass('button_theme_dark-2');
    $tooltip.addClass('tooltip_hidden');
  });


  $('.poll .tick-box-field').on('click', function callback() {
    $selectedTickBoxField = $(this);
  });
});
