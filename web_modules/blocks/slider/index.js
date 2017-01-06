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
    this.$tooltip = $widget.find('.tooltip');
    console.log(this.$tooltip);
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
  }

  render() {
    this.$widget.slider({ range: 'min' });
  }
};


$(() => {
  $('.slider__widget_type_tooltiped').each((_, node) => {
    const tooltipedSlider = new TooltipedSlider($(node));
    tooltipedSlider.render();
  });

  $('.slider__widget_type_scaled').each((_, node) => {
    const scaledSlider = new ScaledSlider($(node));
    scaledSlider.render();
  });
});
