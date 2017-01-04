import $ from 'jquery';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/slider.css';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';

import '../slider-tooltip-container';
import './slider.styl';

const TooltipedSlider = class {
  constructor($slider) {
    this.$slider = $slider;
    this.$tooltipText = $slider.find('.tooltip__text');
  }

  render() {
    this.$slider.slider({
      slide: (_, ui) => {
        this.$tooltipText.text(ui.value);
      },
    });
  }
};

const ScaledSlider = class {
  constructor($slider) {
    this.$slider = $slider;
  }

  render() {
    this.$slider.slider({ range: 'min' });
  }
};


$(() => {
  $('.slider_type_tooltiped').each((_, node) => {
    const tooltipedSlider = new TooltipedSlider($(node));
    tooltipedSlider.render();
  });

  $('.slider_type_scaled').each((_, node) => {
    const scaledSlider = new ScaledSlider($(node));
    scaledSlider.render();
  });
});
