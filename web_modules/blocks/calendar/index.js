import $ from 'jquery';

import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'font-awesome.css';

import './calendar.styl';

const Calendar = class {
  constructor($calendar) {
    this.$calendar = $calendar;
    this.$widget = $calendar.find('.js-calendar__widget');
    this.$todayButton = this.$calendar.find('.js-calendar__today-button');
    this.render();
    this.attachEventHandlers();
  }

  render() {
    this.$widget.datepicker({
      changeYear: false,
      altField: this.$calendar.find('.js-calendar__day'),
      altFormat: 'd',
      firstDay: 1,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });
  }

  attachEventHandlers() {
    this.$todayButton.on('click', () => {
      this.$widget.datepicker('setDate', new Date());
    });
  }
};

$(() => {
  $('.js-calendar').each((_, node) => {
    new Calendar($(node)); // eslint-disable-line no-new
  });
});

