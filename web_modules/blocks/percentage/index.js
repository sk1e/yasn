import $ from 'jquery';

import PercentageView from './percentage-view';
import './percentage.styl';


const percentageViewMap = new Map();

export default percentageViewMap;

$(() => {
  $('.percentage').each(function callback() {
    const value = this.attributes['data-value'];
    if (value) {
      const initialPercents = JSON.parse(value.value);
      const values = [initialPercents, 100 - initialPercents];
      percentageViewMap.set(this, new PercentageView(this, values, 43, 47));
    }
  });
});
