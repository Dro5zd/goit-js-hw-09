import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const body = document.querySelector('body');
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('.field');
const fieldValue = document.querySelectorAll('.value');
const fieldLabel = document.querySelectorAll('.label');

body.style.backgroundColor = 'teal';

timer.style.display = 'flex';
timer.style.width = '60%';
timer.style.margin = '0 auto';
timer.style.justifyContent = 'space-around';

input.style.fontSize = '21px';

startBtn.setAttribute('disabled', 'disabled');

startBtn.style.display = 'block';
startBtn.style.margin = '60px auto';
startBtn.style.fontSize = '30px';
startBtn.style.textTransform = 'uppercase';
startBtn.style.backgroundColor = 'rgba(18, 217, 127, 0.29)';
startBtn.style.color = 'white';
startBtn.style.padding = '10px';
startBtn.style.border = 'none';

field.forEach(el => {
  el.style.display = 'flex';
  el.style.width = '200px';
  el.style.flexDirection = 'column';
  el.style.justifyContent = 'center';
  el.style.alignItems = 'center';
});

fieldValue.forEach(el => {
  el.style.fontSize = '90px';
});

fieldLabel.forEach(el => {
  el.style.fontSize = '15px';
  el.style.textTransform = 'uppercase';
});

let flag = true;
let valueObj = {};
let timeInit = 0;
let interval;
const addLeadingZero = (value) => value.toString().padStart(2, '0');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', 'disabled');
      startBtn.style.backgroundColor = 'rgba(18, 217, 127, 0.29)';
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.style.backgroundColor = 'rgba(18, 217, 127, 1)';
      timeInit = selectedDates[0] - options.defaultDate;
      valueObj = convertMs(timeInit);
      Object.keys(valueObj).forEach(el => document.querySelector(`span[data-${el}]`).innerHTML = addLeadingZero(valueObj[el]));
    }
  },
};

flatpickr(input, options);

const timerHandler = () => {
  if (flag) {
    startBtn.style.backgroundColor = 'red';
    startBtn.innerHTML = 'STOP';
    interval = setInterval(() => {
      valueObj = convertMs(timeInit -= 1000);
      Object.keys(valueObj).forEach(el => {
        document.querySelector(`span[data-${el}]`).innerHTML = addLeadingZero(valueObj[el]);
      });
      const isZero = (element) => element === 0;
      if (Object.values(valueObj).every(isZero)) {
        clearInterval(interval);
        Notify.success('Action!');
        startBtn.setAttribute('disabled', 'disabled');
        startBtn.style.backgroundColor = 'rgba(18, 217, 127, 0.29)';
      }
    }, 1000);
  } else {
    startBtn.style.backgroundColor = 'rgba(18, 217, 127)';
    startBtn.innerHTML = 'START';
    clearInterval(interval);
  }
  flag = !flag;
};

startBtn.addEventListener('click', timerHandler);

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