const DESCRIPTION = [
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
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAME = [
  'Артём',
  'Игорь',
  'Иван',
  'Павел',
  'Костя'
];
const SIMILAR_POST_COUNT = 25;
const SIMILAR_COMMENT_COUNT = 2;
// Генератор случайных чисел из переданного диапазона
function getRandomNumberFromRange (min, max) {
  if ((min >= max) || (min < 0)) {
    throw new Error ('первое число должно быть меньше второго, оба числа должны быть положительными');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
// Генератор случайных неповторяющихся чисел из диапазона
function getRandomIdFromRange (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomNumberFromRange(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumberFromRange(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const generatePhotoId = getRandomIdFromRange (1, 25);
const generateCommentId = getRandomIdFromRange (1, 200);
//Генератор рандомного элемента массива
const getRandomArrayElement = (arr) => arr[getRandomNumberFromRange(0, arr.length - 1)];
//Генератор объекта комментария
const createKeksogramComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumberFromRange(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME)
});
  // Создание массива комментариев из рандомно сгенерированных объектов
const similarComment = () => (
  Array.from({length: SIMILAR_COMMENT_COUNT}, createKeksogramComment)
);
  // Генератор объекта поста
const createKeksogramPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumberFromRange(15, 200),
  comments: similarComment()
});
  // Создание массива постов из рандомно сгенерированных объектов
const similarPost = Array.from({length: SIMILAR_POST_COUNT}, createKeksogramPost);
console.log(similarPost);
