import 'd3-transition';

import { arc, pie } from 'd3-shape';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';


const CircularArcsView = class {
  static get fillColors() {
    throw new Error('not implemented');
  }

  get values() { return this._values; }

  set values(xs) {
    this._values = xs;
    this.paths.data(this.pie(xs));
    this.paths.transition().duration(750).attrTween('d', this.interpolatorFactory);
  }

  constructor(node, values, innerRadius, outerRadius) {
    this._values = values;

    const width = node.offsetWidth;

    this.pie = pie().value(x => x).sort(null);

    const chartArc = arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);


    const $svg = select(node).append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width} ${width}`)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${width / 2})`);

    this.paths = this.makePaths($svg, width, width, this.pie(values), chartArc);
    this.interpolatorFactory = function interpolatorFactory(primaryArc) {
      const interpolator = interpolate(this._current, primaryArc);
      this._current = interpolator(0);
      return x => chartArc(interpolator(x));
    };
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
};


export default CircularArcsView;

