/* global ymaps:true */

import $ from 'jquery';
import markerImagePath from './images/marker.png';

$(() => {
  ymaps.ready(() => {
    const myMap = new ymaps.Map('map', {
      center: [37.790988, -122.414978],
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
