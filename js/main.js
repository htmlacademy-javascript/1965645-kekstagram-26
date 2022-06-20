const SIMILAR_POST_COUNT = 25;
const DESCRIPTIONS = [
  'утреннее фото',
  'красота',
  'случайное фото',
  'получилось неплохо',
  'сам сфоткал',
  ':))',
  '^_^',
  ':(',
  'красота да и только',
  'скучаю..'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const USER_NAMES = [
  'Артём',
  'Игорь',
  'Иван',
  'Павел',
  'Костя'
];

function getRandomNumberFromRange (min, max) {
  if ((min >= max) || (min < 0)) {
    throw new Error ('первое число должно быть меньше второго, оба числа должны быть положительными');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getRandomArrayElement = (arr) => arr[getRandomNumberFromRange(0, arr.length - 1)];

const createComments = (commentCount) => {
  const result = [];

  for (let i = 1; i <= commentCount; i++) {
    result.push({
      id: i,
      avatar: `img/avatar-${getRandomNumberFromRange(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(USER_NAMES)
    });
  }
  return result;
};

const createPosts = (postCount) => {
  const result = [];

  for (let i = 1; i <= postCount; i++) {
    result.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomNumberFromRange(15, 200),
      comments: createComments(getRandomNumberFromRange(2,10))
    });
  }
  return result;
};
createPosts(SIMILAR_POST_COUNT);
