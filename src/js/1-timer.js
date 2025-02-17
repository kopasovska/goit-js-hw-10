// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import 'font-awesome/css/font-awesome.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageSize: '16px',
        messageLineHeight: '1.5',
        icon: 'fa fa-exclamation-circle',
        iconColor: '#fff',
        position: 'topRight',
      });

      // alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      refs.startBtn.disabled = false;
    }
  },
};

const datePicker = flatpickr(refs.dateInput, options); // flatpickr

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  timer.start();
}

const timer = {
  intervalId: null,

  start() {
    refs.startBtn.disabled = true;
    refs.dateInput.disabled = true;
    const currentDate = Date.now();
    let diff = userSelectedDate.getTime() - currentDate;
    setTime(diff);

    this.intervalId = setInterval(() => {
      diff -= 1000;
      setTime(diff);
      if (diff < 1000) {
        this.stop();
      }
    }, 1000);
  },

  stop() {
    refs.dateInput.disabled = false;
    clearInterval(this.intervalId);
  },
};

function setTime(diff) {
  const time = convertMs(diff);

  refs.days.textContent = addLeadingZero(time).days;
  refs.hours.textContent = addLeadingZero(time).hours;
  refs.minutes.textContent = addLeadingZero(time).minutes;
  refs.seconds.textContent = addLeadingZero(time).seconds;
}

function addLeadingZero(time) {
  const days = String(time.days).padStart(2, '0');
  const hours = String(time.hours).padStart(2, '0');
  const minutes = String(time.minutes).padStart(2, '0');
  const seconds = String(time.seconds).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
