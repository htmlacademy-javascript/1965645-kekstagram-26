import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const closeSuccessButton = successMessageTemplate.querySelector('.success__button');
const closeErrorButton = errorMessageTemplate.querySelector('.error__button');

let activeMessage;

const closeMessage = () => {
  document.body.removeChild(activeMessage);
  window.removeEventListener('keydown', handleKeydown, true);
  window.removeEventListener('click', onClickOutsideBlock);
};

function onClickOutsideBlock (evt) {
  if (evt.target === activeMessage) {
    closeMessage();
  }
}

function handleKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopImmediatePropagation();
    closeMessage();
  }
}

const bindCommonListeners = () => {
  window.addEventListener('keydown', handleKeydown, true);
  window.addEventListener('click', onClickOutsideBlock);
};

const showSuccessMessage = () => {
  activeMessage = successMessageTemplate;
  document.body.appendChild(successMessageTemplate);

  closeSuccessButton.addEventListener('click', closeMessage, { once: true });
  bindCommonListeners();
};

const showErrorMessage = () => {
  activeMessage = errorMessageTemplate;
  document.body.appendChild(errorMessageTemplate);

  closeErrorButton.addEventListener('click', closeMessage, { once: true });
  bindCommonListeners();
};

export { showSuccessMessage, showErrorMessage };
