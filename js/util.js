function getRandomNumberFromRange (min, max) {
  if ((min >= max) || (min < 0)) {
    throw new Error ('первое число должно быть меньше второго, оба числа должны быть положительными');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getRandomArrayElement = (arr) => arr[getRandomNumberFromRange(0, arr.length - 1)];
export {getRandomNumberFromRange, getRandomArrayElement};
