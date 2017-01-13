import $ from 'jquery';
import 'font-awesome.css';

import '../input';
import '../birthday-dropdowns';
import '../button';
import '../percentage';
import PercentageView from '../percentage/percentage-view';
import './profile-settings.styl';


const ProfileSettings = class {
  constructor($profileSettings) {
    this.$profileSettings = $profileSettings;
    this.$percentage = $profileSettings.find('.js-profile-settings__percentage');
    this.$saveNotification = $profileSettings.find('.js-profile-settings__save-notification');

    this.inputNodes = $profileSettings.find('.js-profile-settings__input').toArray();
    this.dropDownSelectNodes = $profileSettings.find('.js-profile-settings__dropdown-select').toArray();

    this.percentageView = new PercentageView(this.$percentage[0], this.filledFieldsPercent());
    this.attachEventHandlers();
  }
  attachEventHandlers() {
    this.$profileSettings.on('submit', (event) => {
      event.preventDefault();
      this.percentageView.percent = this.filledFieldsPercent();
      this.$saveNotifacation
        .addClass('profile-settings__save-notification_notifying')
        .on('transitionend', () => this.$saveNotifacation.removeClass('profile-settings__save-notification_notifying'));
    });
  }

  filledFieldsPercent() {
    const filled = this.inputNodes.reduce((acc, x) => (x.value === '' ? acc : acc + 1), 0)
            + this.dropDownSelectNodes
            .reduce((acc, x, i) => (x.value === ['Year', 'Month', 'Day'][i] ? acc : acc + 1), 0);

    const total = this.inputNodes.length + this.dropDownSelectNodes.length;
    return Math.round((filled / total) * 100);
  }
};

$(() => {
  new ProfileSettings($('.js-profile-settings').eq(0)); // eslint-disable-line no-new
});
