import $ from 'jquery';
import johnImagePath from 'user-photos/john.png';
import '../video';
import '../text-area';
import '../button';
import '../arrow-button';
import UserProfile from '../user-profile';

import './commentable.styl';
import commentTemplate from './comment-dynamic-template.pug';

const Commentable = class {
  constructor($commentable) {
    this.$textarea = $commentable.find('.js-commentable__text-area');
    this.$commentList = $commentable.find('.js-commentable__comment-list');
    this.$sendButton = $commentable.children('.js-commentable__send-button');
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.$sendButton.on('click', this.submitComment.bind(this));
    this.$textarea.keydown((event) => {
      if (event.keyCode === 13) {
        this.submitComment();
        return false;
      }
      return true;
    });
  }

  submitComment() {
    if (this.$textarea[0].value === '') {
      return;
    }
    const commentHTML = commentTemplate({
      name: 'John Smith',
      profession: 'UX designer',
      imagePath: johnImagePath,
      theme: 'gray',
      twitter: 'https://twitter.com/john_smith',
      text: this.$textarea[0].value.replace(/https:\/\/www.youtube.com\/watch\?v=(\S+)/g,
                                       '<iframe class=video src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'),
    });
    this.$textarea[0].value = '';
    const $lastComment = this.$commentList.append(commentHTML).children().last();
    new UserProfile($lastComment.find('.js-user-profile')); // eslint-disable-line no-new

    const commentList = this.$commentList[0];
    commentList.scrollTop = commentList.scrollHeight;
  }
};


$(() => {
  $('.js-commentable').each((_, node) => {
    new Commentable($(node)); // eslint-disable-line no-new
  });
});
