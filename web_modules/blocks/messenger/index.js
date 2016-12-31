import $ from 'jquery';

import '../button';
import '../text-area';
import '../photocam-icon';
import '../message-icon';
import './messenger.styl';
import messageSelfTemplate from './message-self-dynamic-template.pug';

const Messenger = class {
  constructor($messenger) {
    this.$textarea = $messenger.find('.text-area');
    this.$messageList = $messenger.find('.messenger__message-list');
    this.scrollViewNode = $messenger.find('.messenger__scroll-view')[0];
    this.$replyButton = $messenger.find('.button');
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
    sv.scrollTo(0, sv.scrollHeight - sv.clientHeight);
  }
};

$(() => {
  $('.messenger').each((_, node) => {
    const messenger = new Messenger($(node));
    messenger.attachEventHandlers();
  });
});
