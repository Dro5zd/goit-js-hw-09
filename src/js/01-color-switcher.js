const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const randomBodyColorHandler = () => body.style.backgroundColor = `${getRandomHexColor()}`;

let myInterval;
stopBtn.setAttribute('disabled', 'disabled');

function startBtnHandler() {
  myInterval = setInterval(randomBodyColorHandler, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
}

function stopBtnHandler() {
  clearInterval(myInterval);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stopBtnHandler);
