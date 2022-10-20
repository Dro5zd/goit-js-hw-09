const form = document.querySelector('form');
import { Notify } from 'notiflix';

let obj = {};

form.addEventListener('input', e => {
  obj[e.target.name] = e.target.value;
});

form.addEventListener('submit', (event) => {
  let { step, amount, delay } = obj;
  event.preventDefault();
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = +delay + +step
  }
  form.reset();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
