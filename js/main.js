import { renderPosts, bindPostClickListener } from './post-renderer.js';
import { openBigPicture } from './fullscreen-picture.js';
import { initPostForm } from './new-post-form.js';
import { getData } from './api.js';

import { applyFilter, bindImgFilterListeners, showFilters, FilterType } from './filters.js';

initPostForm();

getData((similarPosts) => {
  showFilters();
  applyFilter(FilterType.DEFAULT, similarPosts, renderPosts);
  bindImgFilterListeners(similarPosts, renderPosts);
  bindPostClickListener((postId) => {
    const selectedPost = similarPosts.find((post) => post.id === +postId);
    openBigPicture(selectedPost);
  });
});

