import $ from 'jquery';

import './search.styl';
import '../input/input';

$(() => {
  const search = $('.search');
  search.find('.search__button').on('click', () => {
    search.find('.search__results').toggleClass('search__results_hidden');
  });
});
