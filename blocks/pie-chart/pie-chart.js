import $ from 'jquery';
import * as d3 from 'd3';
import colors from '../../colors.json';


$(() => {
  $('canvas.pie-chart').each(function callback() {
    const context = this.getContext('2d');
    const values = JSON.parse(this.attributes.values.value);

    const width = this.width;
    const height = this.height;

    const fillColors = [colors['theme-color-3-foreground'], colors['theme-color-2'], colors['theme-color-1'], colors['theme-color-3']];

    const arc = d3.arc()
            .innerRadius(30)
            .outerRadius(47)
            .context(context);

    const pie = d3.pie()
            .sort(null)
            .value(x => x);

    context.translate(width / 2, height / 2);

    const arcs = pie(values);

    arcs.forEach((x, i) => {
      context.beginPath();
      arc(x);
      context.fillStyle = fillColors[i];
      context.fill();
    });
  });
});
