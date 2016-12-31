import $ from 'jquery';

import PercentageView from './percentage-view';
import './percentage.styl';


const Percentage = class {
  constructor(node, value) {
    this.value = value;
    this.node = node;
  }
  render() {
    this.percentageView = new PercentageView(this.node, this.value, 43, 47);
  }
};

$(() => {
  $('.percentage').each((_, node) => {
    const value = node.attributes['data-value'];
    if (value) {
      const percentage = new Percentage(node, JSON.parse(value.value));
      percentage.render();
    }
  });
});
