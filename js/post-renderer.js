const pictureBox = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPosts = (postData) => {
  pictureBox.querySelectorAll('.picture').forEach((picture) => picture.remove());
  const similarPicturesFragment = document.createDocumentFragment();

  postData.forEach((post) => {
    const similarPicture = pictureTemplate.cloneNode(true);
    similarPicture.querySelector('.picture__img').src = post.url;
    similarPicture.querySelector('.picture__comments').textContent = post.comments.length;
    similarPicture.querySelector('.picture__likes').textContent = post.likes;
    similarPicture.dataset.postId = post.id;
    similarPicturesFragment.appendChild(similarPicture);
  });
  pictureBox.appendChild(similarPicturesFragment);
};

const bindPostClickListener = (callback) => {
  pictureBox.addEventListener('click', (evt) => {
    const similarPicture = evt.target.closest('.picture');
    if (similarPicture) {
      callback(similarPicture.dataset.postId);
    }
  });
};
export {renderPosts, bindPostClickListener};
