import $ from 'jquery';

import './search.styl';
import '../input';

const Search = class {
  constructor($search) {
    this.$button = $search.find('.js-search__button');
    this.$results = $search.find('.js-search__results');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$button.on('click', () => {
      this.$results.toggleClass('search__results_hidden');
      return false;
    });
  }
};

$(() => {
  $('.js-search').each((_, node) => {
    new Search($(node)); // eslint-disable-line no-new
  });
});
