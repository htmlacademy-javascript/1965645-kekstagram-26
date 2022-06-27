import {createPosts, SIMILAR_POST_COUNT} from './generate-posts.js';
import {renderPosts} from './render-posts.js';
renderPosts(createPosts(SIMILAR_POST_COUNT));
