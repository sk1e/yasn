import $ from 'jquery';

import '../button';
import '../text-area';
import '../photocam-icon';
import '../message-icon';
import '../user-photo';
import '../tooltip';
import './messenger.styl';
import messageSelfTemplate from './message-self-dynamic-template.pug';

const Messenger = class {
  constructor($messenger) {
    this.$textarea = $messenger.find('.js-messenger__text-area');
    this.$messageList = $messenger.find('.js-messenger__message-list');
    this.scrollViewNode = $messenger.find('.js-messenger__scroll-view')[0];
    this.$replyButton = $messenger.find('.js-messenger__reply-button');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$replyButton.on('click', this.submitMessage.bind(this));
    this.$textarea.keydown((event) => {
      if (event.keyCode === 13) {
        this.submitMessage();
        return false;
      }
      return true;
    });
  }

  submitMessage() {
    const textarea = this.$textarea[0];
    if (textarea.value === '') {
      return;
    }
    this.$messageList.append(messageSelfTemplate({ text: textarea.value }));
    textarea.value = '';
    const sv = this.scrollViewNode;
    sv.scrollTop = sv.scrollHeight;
  }
};

$(() => {
  $('.js-messenger').each((_, node) => {
    new Messenger($(node)); // eslint-disable-line no-new
  });
});
