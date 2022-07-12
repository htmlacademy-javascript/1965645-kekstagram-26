import {isEscapeKey} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const renderComments = (elements) => {
  let comments ='';
  elements.forEach((element) => {
    comments += `
<li class="social__comment">
<img
class="social__picture"
src="${element.avatar}"
alt="${element.name}"
width="35" height="35">
<p class="social__text">${element.message}</p>
</li>
`;

  });
  socialComments.innerHTML = comments;
};


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

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
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  renderComments(picture.comments);

  closeButton.addEventListener('click', closeBigPicture);

  window.addEventListener('keydown', handleKeydown);

};
export {openBigPicture};
