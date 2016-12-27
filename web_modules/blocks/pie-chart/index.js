import $ from 'jquery';

import './pie-chart.styl';
import PieChartView from './pie-chart-view.js';

const pieChartViewMap = new Map();

export default pieChartViewMap;

$(() => {
  $('.pie-chart').each(function callback() {
    const values = JSON.parse(this.attributes['data-values'].value);

    pieChartViewMap.set(this, new PieChartView(this, values, 30, 47));
  });
});
