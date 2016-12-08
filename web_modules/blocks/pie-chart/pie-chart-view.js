import 'd3/d3-transition';

import { arc, pie } from 'd3/d3-shape';
import { select } from 'd3/d3-selection';
import { interpolate } from 'd3/d3-interpolate';

import colors from 'colors.json';


const PieChartView = class {
  static get fillColors() {
    return [
      colors['theme-color-3-foreground'],
      colors['theme-color-2'],
      colors['theme-color-1'],
      colors['theme-color-3'],
    ];
  }

  get values() { return this._values; }

  set values(xs) {
    this._values = xs;
    this.paths.data(this.pie(xs));
    this.paths.transition().duration(750).attrTween('d', this.interpolatorFactory);
  }

  initializeValues(node) {
    this._values = JSON.parse(node.attributes.values.value);
  }

  makePaths(svg, width, height, data, chartArc) {
    return svg.selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('fill', (_, i) => this.constructor.fillColors[i])
      .attr('d', chartArc)
      .each(function callback(x) { this._current = x; });
  }

  constructor(node, values, innerRadius, outerRadius) {
    this._values = values;

    const width = node.offsetWidth;
    const height = node.offsetHeight;

    this.pie = pie().value(x => x).sort(null);

    const chartArc = arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const svg = select(node).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

    this.paths = this.makePaths(svg, width, height, this.pie(values), chartArc);

    this.interpolatorFactory = function interpolatorFactory(primaryArc) {
      const interpolator = interpolate(this._current, primaryArc);
      this._current = interpolator(0);
      return x => chartArc(interpolator(x));
    };
  }
};


export default PieChartView;

