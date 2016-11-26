import $ from 'jquery';


$(() => {
  const slider = $('.slider_type_tooltiped');
  const tooltipText = slider.find('.tooltip__text');

  slider.slider({
    slide: (_, ui) => {
      tooltipText.text(ui.value);
    },
  });

  $('.slider_type_scaled').slider({ range: 'min' });
});
