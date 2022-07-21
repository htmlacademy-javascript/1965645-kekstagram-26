import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const closeSuccessButton = successMessageTemplate.querySelector('.success__button');
const closeErrorButton = errorMessageTemplate.querySelector('.error__button');

const closeSuccessMessage = () => {
  document.body.removeChild(successMessageTemplate);

  closeSuccessButton.removeEventListener('click', closeSuccessMessage);
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('click', onClickOutsideBlock);
};

const closeErrorMessage = () => {
  document.body.removeChild(errorMessageTemplate);

  closeErrorButton.removeEventListener('click', closeErrorMessage);
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('click', onClickOutsideBlock);
};

function onClickOutsideBlock (evt) {
  if ((evt.target === successMessageTemplate) || (evt.target === errorMessageTemplate)) {
    closeSuccessMessage();
    closeErrorMessage();
  }
}

function handleKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopImmediatePropagation();

    closeSuccessMessage();
    closeErrorMessage();
  }
}

const showSuccessMessage = () => {
  document.body.appendChild(successMessageTemplate);

  closeSuccessButton.addEventListener('click', closeSuccessMessage);
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('click', onClickOutsideBlock);
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessageTemplate);

  closeErrorButton.addEventListener('click', closeErrorMessage);
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('click', onClickOutsideBlock);
};

export { showSuccessMessage, showErrorMessage };
