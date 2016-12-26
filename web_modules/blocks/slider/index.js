import $ from 'jquery';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/slider.css';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';

import './slider.styl';


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
