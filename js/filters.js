import {  debounce } from './util.js';

const RANDOM_POSTS_AMOUNT = 10;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const buttonIdToFilterType = {
  'filter-default': FilterType.DEFAULT,
  'filter-random': FilterType.RANDOM,
  'filter-discussed': FilterType.DISCUSSED,
};

const imgFiltersForm = document.querySelector('.img-filters__form');
const filters = document.querySelector('.img-filters');
let currentFilter;

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const getRandomPosts = (posts) => posts.slice().sort(()=>Math.random()-0.5).slice(0, RANDOM_POSTS_AMOUNT);

const getDiscussedPosts = (posts) => posts.slice().sort((postA, postB) => postB.comments.length - postA.comments.length);

const applyFilter = (filterType, posts, onFilterationComplete) => {
  if (filterType === currentFilter) {
    return;
  }

  currentFilter = filterType;
  let filteredPosts;

  switch (filterType) {
    case FilterType.RANDOM:
      filteredPosts = (getRandomPosts(posts));
      break;
    case FilterType.DISCUSSED:
      filteredPosts = (getDiscussedPosts(posts));
      break;
    case FilterType.DEFAULT:
      filteredPosts = posts;
      break;
  }
  onFilterationComplete(filteredPosts);
};
const onFilterChange = debounce(applyFilter);

const bindImgFilterListeners = (posts, onFilterationComplete) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const filterType = buttonIdToFilterType[evt.target.id];

    if (filterType) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');

      onFilterChange(filterType, posts, onFilterationComplete);
    }
  });
};

export { applyFilter, bindImgFilterListeners, showFilters, FilterType };
