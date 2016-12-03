import $ from 'jquery';

import 'jquery-ui/ui/widgets/datepicker.js';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'font-awesome';

import './calendar.styl';

$(() => {
  $('.calendar').each(function callback() {
    $('.calendar__widget', $(this)).datepicker({
      changeYear: false,
      altField: $('.calendar__day', $(this)),
      altFormat: 'd',
      firstDay: 1,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      showButtonPanel: true,
    });
  });
});
