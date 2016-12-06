import $ from 'jquery';

import './pie-chart.styl';
import PieChartView from './pie-chart-view.js';

const pieChartViewMap = new Map();

export default pieChartViewMap;

$(() => {
  $('.pie-chart').each(function callback() {
    pieChartViewMap.set(this, new PieChartView(this, 30, 47));
  });
});
