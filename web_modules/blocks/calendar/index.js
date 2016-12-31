import $ from 'jquery';

import 'jquery-ui/ui/widgets/datepicker.js';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'font-awesome';

import './calendar.styl';

const Calendar = class {
  constructor($calendar) {
    this.$calendar = $calendar;
  }

  render() {
    this.$calendar.find('.calendar__widget').datepicker({
      changeYear: false,
      altField: this.$calendar.find('.calendar__day'),
      altFormat: 'd',
      firstDay: 1,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      showButtonPanel: true,
    });
  }
};

$(() => {
  $('.calendar').each((_, node) => {
    const calendar = new Calendar($(node));
    calendar.render();
  });
});
