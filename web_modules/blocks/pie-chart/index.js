import $ from 'jquery';

import './pie-chart.styl';
import PieChartView from './pie-chart-view';


const PieChart = class {
  constructor($pieChart, values) {
    this.$pieChart = $pieChart;
    this.values = values;
  }

  attachEventHandlers() {
    this.$pieChart.on('add-1-for-index:', (_, index) => {
      this.pieChartView.values = this.pieChartView.values.map((x, i) => (i === index ? x + 1 : x));
    });
  }

  render() {
    this.pieChartView = new PieChartView(this.$pieChart[0], this.values, 30, 47);
  }
};

$(() => {
  $('.js-pie-chart').each((_, node) => {
    const values = JSON.parse(node.attributes['data-values'].value);
    const pieChart = new PieChart($(node), values);
    pieChart.render();
    pieChart.attachEventHandlers();
  });
});
