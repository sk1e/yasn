import $ from 'jquery';

import PercentageView from './percentage-view';
import './percentage.styl';


const Percentage = class {
  constructor(node, value) {
    this.value = value;
    this.node = node;
    this.render();
  }
  render() {
    this.percentageView = new PercentageView(this.node, this.value);
  }
};

$(() => {
  $('.js-percentage').each((_, node) => {
    const value = node.attributes['data-value'];
    new Percentage(node, JSON.parse(value.value)); // eslint-disable-line no-new
  });
});
