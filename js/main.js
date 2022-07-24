import { renderPosts, bindPostClickListener } from './post-renderer.js';
import { openBigPicture } from './fullscreen-picture.js';
import { initPostForm } from './new-post-form.js';
import { getData } from './api.js';

initPostForm();

getData((similarPosts) => {
  renderPosts(similarPosts);
  bindPostClickListener((postId) => {
    const selectedPost = similarPosts.find((post) => post.id === +postId);
    openBigPicture(selectedPost);
  });
});

