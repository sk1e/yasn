/* global ymaps:true */

import $ from 'jquery';
import 'font-awesome.css';
import './location.styl';

import markerImagePath from './images/marker.png';

const Location = class {
  constructor($location) {
    this.mapNode = $location.find('.js-location__map')[0];
    this.coordinates = JSON.parse($location[0].attributes['data-coordinates'].value);
    this.attachCoordinates();
  }

  attachCoordinates() {
    ymaps.ready(() => {
      const myMap = new ymaps.Map(this.mapNode, {
        center: this.coordinates,
        zoom: 15,
        controls: [],
      }, {
        searchControlProvider: 'yandex#search',
      });
      const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        iconLayout: 'default#image',
        iconImageHref: markerImagePath,
        iconImageSize: [59, 60],
      });
      myMap.geoObjects.add(myPlacemark);
    });
  }
};

$(() => {
  $('.js-location').each((_, node) => {
    new Location($(node)); // eslint-disable-line no-new
  });
});
