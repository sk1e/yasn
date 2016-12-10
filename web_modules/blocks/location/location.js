/* global ymaps:true */

import $ from 'jquery';
import 'font-awesome';
import './location.styl';

import markerImagePath from './images/marker.png';

$(() => {
  const coordinates = JSON.parse($('.location')[0].attributes.coordinates.value);
  ymaps.ready(() => {
    const myMap = new ymaps.Map('map', {
      center: coordinates,
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
});
