//Функция, возвращающая случайное целое число из переданного диапазона
const getRandomNumberFromRange = (min, max) => {
  if ((min >= max) || (min < 0)) {
    throw new Error ('первое число должно быть меньше второго, оба числа должны быть положительными');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
getRandomNumberFromRange (0, 45);


//Функция для проверки длины строки
function checkStringLength (string, length) {
  return string.length <= length;
}
checkStringLength('aaaa', 3);
