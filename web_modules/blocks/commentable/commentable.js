import $ from 'jquery';

import 'blocks/user-profile/user-profile';
import 'blocks/video/video';
import 'blocks/text-area/text-area';
import 'blocks/button/button';
import 'blocks/arrow-button/arrow-button';

import './commentable.styl';

const commentTemplate = require('./comment-dynamic-template.pug');
const johnImagePath = require('user-photos/john.png');


$(() => {
  const $textarea = $('.commentable .text-area');

  function submitComment() {
    const commentHTML = commentTemplate({
      name: 'John Smith',
      profession: 'UX designer',
      imagePath: johnImagePath,
      theme: 'gray',
      twitter: 'https://twitter.com/john_smith',
      text: $textarea[0].value.replace(/https:\/\/www.youtube.com\/watch\?v=(\S+)/g,
                                       '<iframe class=video src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'),
    });
    $textarea[0].value = '';

    const $commentList = $textarea.parent().prev();
    $commentList.append(commentHTML); // todo escape html

    const commentList = $commentList[0];
    commentList.scrollTo(0, commentList.scrollHeight - commentList.clientHeight);
  }

  $('.commentable__input + .button').on('click', submitComment);
  $('.commentable .text-area').keydown((event) => {
    if (event.keyCode === 13) {
      submitComment();
      return false;
    }
    // console.log($textarea[0].value);
  });
});

