const pictureBox = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPosts = (postData) => {
  const similarPicturesFragment = document.createDocumentFragment();

  postData.forEach((post) => {
    const similarPicture = pictureTemplate.cloneNode(true);
    similarPicture.querySelector('.picture__img').src = post.url;
    similarPicture.querySelector('.picture__comments').textContent = post.comments.length;
    similarPicture.querySelector('.picture__likes').textContent = post.likes;
    similarPicturesFragment.appendChild(similarPicture);
  });
  pictureBox.appendChild(similarPicturesFragment);
};

export {renderPosts};
