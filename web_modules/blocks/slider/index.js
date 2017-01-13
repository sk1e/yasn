import $ from 'jquery';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/slider.css';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';

import '../slider-tooltip-container';
import './slider.styl';

const TooltipedSlider = class {
  constructor($widget) {
    this.$widget = $widget;
    this.$tooltip = $widget.find('.js-slider__tooltip');
    this.render();
  }

  render() {
    this.$widget.slider({
      slide: (_, ui) => {
        this.$tooltip.triggerHandler('set-text:', ui.value);
      },
    });
  }
};

const ScaledSlider = class {
  constructor($widget) {
    this.$widget = $widget;
    this.render();
  }

  render() {
    this.$widget.slider({ range: 'min' });
  }
};


$(() => {
  $('.js-slider__widget_type_tooltiped').each((_, node) => {
    const tooltipedSlider = new TooltipedSlider($(node));
    tooltipedSlider.render(); // eslint-disable-line no-new
  });

  $('.js-slider__widget_type_scaled').each((_, node) => {
    new ScaledSlider($(node)); // eslint-disable-line no-new
  });
});
