import {isEscapeKey} from './util.js';

const SHOWN_COMMENTS_AMOUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let renderedComments = 0;
let pictureComments;

const createComment = (comment) => (
  `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>
  `
);

const renderComments = () => {
  const commentsToRender = pictureComments.slice(renderedComments, renderedComments + SHOWN_COMMENTS_AMOUNT);
  let commentsData ='';

  renderedComments += commentsToRender.length;

  if (pictureComments.length === renderedComments) {
    commentsLoader.classList.add('hidden');
  }

  commentsToRender.forEach((comment) => {
    commentsData += createComment(comment);
  });

  socialComments.insertAdjacentHTML('beforeend', commentsData);
  commentCount.innerHTML = `${renderedComments} из ${pictureComments.length} комментариев`;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.classList.add('hidden');
  renderedComments = 0;

  commentsLoader.removeEventListener ('click', renderComments);
  closeButton.removeEventListener('click', closeBigPicture);
  window.removeEventListener('keydown', onKeydownClick);
};

function onKeydownClick (evt) {
  if(isEscapeKey(evt)){
    closeBigPicture();
  }
}

const openBigPicture = (picture) => {
  pictureComments = picture.comments;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  socialComments.innerHTML = '';

  if (picture.comments.length > SHOWN_COMMENTS_AMOUNT) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', renderComments);
  }

  renderComments();

  closeButton.addEventListener('click', closeBigPicture);
  window.addEventListener('keydown', onKeydownClick);

};

export {openBigPicture};
