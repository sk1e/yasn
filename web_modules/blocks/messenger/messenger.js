import $ from 'jquery';

import '../button/button';
import '../text-area/text-area';
import '../photocam-icon/photocam-icon';
import '../message-icon/message-icon';
import './messenger.styl';

const submitMessage = () => {
  const text = $('.messenger .text-area')[0];
  $('.messenger__message-list').append(`<div class='messenger__message messenger__message_self'>${text.value}</div>`);
  text.value = '';
  const sv = $('.messenger__scroll-view')[0];
  sv.scrollTo(0, sv.scrollHeight - sv.clientHeight);
};

$(() => {
  $('.messenger .button').on('click', submitMessage);
  $('.messenger .text-area').keydown((event) => {
    if (event.keyCode === 13) {
      submitMessage();
      return false;
    }
  });
});
