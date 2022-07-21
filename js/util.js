const ALERT_SHOW_TIME = 2000;

const getRandomNumberFromRange = (min, max) => {
  if ((min >= max) || (min < 0)) {
    throw new Error ('первое число должно быть меньше второго, оба числа должны быть положительными');
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const getRandomArrayElement = (arr) => arr[getRandomNumberFromRange(0, arr.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumberFromRange, getRandomArrayElement, isEscapeKey, showAlert};
