import $ from 'jquery';

import './search.styl';
import '../input';

const Search = class {
  constructor($search) {
    this.$button = $search.find('.search__button');
    this.$results = $search.find('.search__results');
  }

  attachEventHandlers() {
    this.$button.on('click', () => {
      this.$results.toggleClass('search__results_hidden');
    });
  }
};

$(() => {
  $('.search').each((_, node) => {
    const search = new Search($(node));
    search.attachEventHandlers();
  });
});
