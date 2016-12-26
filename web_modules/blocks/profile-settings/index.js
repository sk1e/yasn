import $ from 'jquery';
import 'font-awesome';

import '../input';
import '../birthday-dropdowns';
import '../button';
import '../percentage';
import PercentageView from '../percentage/percentage-view';
import './profile-settings.styl';


function filledFieldsPercent() {
  const filled = $('.input').toArray()
          .reduce((acc, x) => acc + (x.value === '' ? 0 : 1), 0)
          +
          $('.drop-down__select').toArray()
          .reduce((acc, x, i) => acc + (x.value === ['Year', 'Month', 'Day'][i] ? 0 : 1), 0);

  const total = $('.input').length + $('.drop-down__select').length;
  return Math.round((filled / total) * 100);
}


$(() => {
  const percentage = $('.percentage');
  const filledPercent = filledFieldsPercent();
  const view = new PercentageView(percentage[0], [filledPercent, 100 - filledPercent], 43, 47);

  const $saveNotifacation = $('.profile-settings__save-notification');

  $('.profile-settings .button').on('click', () => {
    view.percent = filledFieldsPercent();
    $saveNotifacation
      .addClass('profile-settings__save-notification_notifying')
      .on('transitionend', () => $saveNotifacation.removeClass('profile-settings__save-notification_notifying'));
  });
});
