import { createPosts, SIMILAR_POST_COUNT } from './mock-data.js';
import { renderPosts, bindPostClickListener } from './post-renderer.js';
import { openBigPicture } from './fullscreen-picture.js';
import { initPostForm } from './new-post-form.js';
const posts = createPosts(SIMILAR_POST_COUNT);
renderPosts(posts);

bindPostClickListener((postId) => {
  const selectedPost = posts.find((post) => post.id === +postId);
  openBigPicture(selectedPost);
});
initPostForm();
