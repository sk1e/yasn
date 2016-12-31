import $ from 'jquery';
import johnImagePath from 'user-photos/john.png';
import '../user-profile';
import '../video';
import '../text-area';
import '../button';
import '../arrow-button';

import './commentable.styl';
import commentTemplate from './comment-dynamic-template.pug';

const Commentable = class {
  constructor($commentable) {
    this.$textarea = $commentable.find('.text-area');
    this.$commentList = $commentable.find('.commentable__comment-list');
    this.$sendButton = $commentable.children('.button');
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
    this.$commentList.append(commentHTML);

    const commentList = this.$commentList[0];
    commentList.scrollTo(0, commentList.scrollHeight - commentList.clientHeight);
  }
};


$(() => {
  $('.commentable').each((_, node) => {
    const commentable = new Commentable($(node));
    commentable.attachEventHandlers();
  });
});
