//Функция, возвращающая случайное целое число из переданного диапазона
const getRandomNumber = (min, max) => {
  if ((min >= max) || (min < 0)) {
    throw new Error ('первое число должно быть меньше второго, оба числа должны быть положительными');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
getRandomNumber (0, 45);


//Функция для проверки длины строки
const checkLength = (string, maxlength) => {
  if (string.length > maxlength) {
    return false;
  }
  return true;
};
checkLength('aaaa', 3);
