import $ from 'jquery';
import * as d3 from 'd3';

import './percentage.styl';


$(() => {
  $('canvas.percentage').each(function callback() {
    const context = this.getContext('2d');
    const percents = this.attributes.value.value;
    const width = this.width;
    const height = this.height;
    const colors = ['#e75735', '#fff'];

    const arc = d3.arc()
            .outerRadius(47)
            .innerRadius(43)
            .context(context);

    const pie = d3.pie()
            .sort(null)
            .value(x => x);

    context.translate(width / 2, height / 2);

    const arcs = pie([percents, 100 - percents]);

    arcs.forEach((x, i) => {
      context.beginPath();
      arc(x);
      context.fillStyle = colors[i];
      context.fill();
    });

    context.fillStyle = 'black';
    context.font = '300 42px Lato';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(percents, 0, 0);
  });
});
