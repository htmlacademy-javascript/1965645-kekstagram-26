import {createPosts, SIMILAR_POST_COUNT} from './create-posts.js';
import {renderPosts, bindPostClickListener} from './render-posts.js';
import {openBigPicture} from './open-big-picture.js';
const posts = createPosts(SIMILAR_POST_COUNT);
renderPosts(posts);

bindPostClickListener((postId) => {
  const selectedPost = posts.find((post) => post.id === +postId);
  openBigPicture(selectedPost);
});
