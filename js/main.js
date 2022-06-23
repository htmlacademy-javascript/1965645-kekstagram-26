import {createPosts, SIMILAR_POST_COUNT} from './generate-data.js';
import {renderPosts} from './render-data.js';
renderPosts (createPosts(SIMILAR_POST_COUNT));
