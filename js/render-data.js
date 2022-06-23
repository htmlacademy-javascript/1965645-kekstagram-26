import {createPosts, SIMILAR_POST_COUNT} from './generate-data.js';

const pictureBox = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPicturesFragment = document.createDocumentFragment();

const renderPosts = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const similarPicture = pictureTemplate.cloneNode(true);
    similarPicture.querySelector('.picture__img').src = arr[i].url;
    similarPicture.querySelector('.picture__comments').textContent = arr[i].comments.length;
    similarPicture.querySelector('.picture__likes').textContent = arr[i].likes;
    similarPicturesFragment.appendChild(similarPicture);
  }
};
renderPosts (createPosts(SIMILAR_POST_COUNT));
pictureBox.appendChild(similarPicturesFragment);
export {renderPosts};
