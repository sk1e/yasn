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
    this.$widget = $calendar.find('.calendar__widget');    
    this.$todayButton = this.$calendar.find('.calendar__today-button');
  }

  render() {
      this.$widget.datepicker({
      changeYear: false,
      altField: this.$calendar.find('.calendar__day'),
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
  $('.calendar').each((_, node) => {
    const calendar = new Calendar($(node));
    calendar.render();
    calendar.attachEventHandlers();
  });  
});


