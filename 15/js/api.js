import { showAlert } from './util.js';

const API_URL = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((similarPosts) => {
      onSuccess(similarPosts);
    })
    .catch(() => {
      showAlert('Не удалось отправить запрос');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
