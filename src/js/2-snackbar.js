// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import 'font-awesome/css/font-awesome.min.css';

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  createNotificationButton: document.querySelector('button'),
};

refs.createNotificationButton.addEventListener(
  'click',
  onCreateNotificationButtonClick
);

function onCreateNotificationButtonClick(event) {
  event.preventDefault();
  const selectedOption = document.querySelector('input[name="state"]:checked');
  createPromise(selectedOption);
}

function createPromise(selectedOption) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedOption.value === 'fulfilled') {
        resolve(refs.delay.value);
      } else {
        reject(refs.delay.value);
      }
    }, refs.delay.value);
  });

  promise.then(delay => success(delay)).catch(delay => error(delay));
}

function success(delay) {
  return iziToast.success({
    title: 'OK',
    message: `Fulfilled promise in ${delay} ms!`,
    backgroundColor: '#59a10d',
    titleColor: '#fff',
    messageColor: '#fff',
    titleSize: '16px',
    titleLineHeight: '1.5',
    messageSize: '16px',
    messageLineHeight: '1.5',
    icon: 'fa fa-check-circle',
    iconColor: '#fff',
    position: 'topRight',
  });
}

function error(delay) {
  return iziToast.error({
    title: 'Error',
    message: `Rejected promise in ${delay}ms`,
    backgroundColor: '#ef4040',
    titleColor: '#fff',
    messageColor: '#fff',
    titleSize: '16px',
    titleLineHeight: '1.5',
    messageSize: '16px',
    messageLineHeight: '1.5',
    icon: 'fa fa-times-circle',
    iconColor: '#fff',
    position: 'topRight',
  });
}
