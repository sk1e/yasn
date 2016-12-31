import colors from 'colors.json';

import { interpolate } from 'd3-interpolate';

import PieChartView from '../pie-chart/pie-chart-view';


const PercentageView = class extends PieChartView {
  static get fillColors() {
    return [colors['theme-color-2'], '#fff'];
  }

  get percent() {
    return this.values[0];
  }

  set percent(x) {
    this.values = [x, 100 - x];

    const text = this.text;
    text.transition()
      .duration(750)
      .attrTween('text', function interpolatorFactory() {
        const interpolator = interpolate(this.textContent, x);
        return n => text.text(Math.round(interpolator(n)));
      });
  }

  constructor(node, value, innerRadius, outerRadius) {
    super(node, [value, 100 - value], innerRadius, outerRadius);
  }

  makePaths(svg, width, height, data, chartArc) {
    this.text = svg
      .append('text')
      .attr('class', 'percentage__text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text(this.percent);

    return super.makePaths(svg, width, height, data, chartArc);
  }
};

export default PercentageView;
