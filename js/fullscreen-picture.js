import {isEscapeKey} from './util.js';

const SHOWN_COMMENTS_AMOUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let renderedComments = 0;
let pictureComments;

const renderComments = (comments) => {
  let commentsData ='';
  comments.forEach((comment) => {
    commentsData += `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>
    `;
  });

  socialComments.insertAdjacentHTML('beforeend', commentsData);
};


const handleCommentsLoaderClick = () => {
  const commentsToRender = pictureComments.slice(renderedComments, renderedComments + SHOWN_COMMENTS_AMOUNT);
  renderComments(commentsToRender);
  renderedComments += commentsToRender.length;
  if (pictureComments.length === renderedComments) {
    commentsLoader.classList.add('hidden');
  }
  commentCount.innerHTML = `${renderedComments} из ${pictureComments.length} комментариев`;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.classList.add('hidden');
  renderedComments = 0;
  commentCount.innerHTML = '';

  commentsLoader.removeEventListener ('click', handleCommentsLoaderClick);
  closeButton.removeEventListener('click', closeBigPicture);
  window.removeEventListener('keydown', handleKeydown);
};

function handleKeydown (evt) {
  if(isEscapeKey(evt)){
    closeBigPicture();
  }
}

const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  socialComments.innerHTML = '';
  if (picture.comments.length > SHOWN_COMMENTS_AMOUNT) {
    commentsLoader.classList.remove('hidden');
    renderComments(picture.comments.slice(0, SHOWN_COMMENTS_AMOUNT));
    renderedComments += SHOWN_COMMENTS_AMOUNT;
    pictureComments = picture.comments;
    commentsLoader.addEventListener('click', handleCommentsLoaderClick);
  } else {
    renderComments(picture.comments);
    renderedComments += picture.comments.length;
  }

  commentCount.innerHTML = `${renderedComments} из ${picture.comments.length} комментариев`;
  closeButton.addEventListener('click', closeBigPicture);

  window.addEventListener('keydown', handleKeydown);

};

export {openBigPicture};
