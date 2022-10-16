const form = document.querySelector('form');
import { Notify } from 'notiflix';

let obj = {};

form.addEventListener('input', e => {
  obj[e.target.name] = e.target.value;
});

form.addEventListener('submit', (event) => {
  let { step, amount, delay } = obj;
  event.preventDefault();
  let num = 1;
  let newDelay = +delay - +step;

  let interval = setTimeout(() => {
    newDelay += +step;
    createPromise(num, newDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    interval = setInterval(() => {
      num += 1;
      newDelay += +step;
      createPromise(num, newDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      if (num === +amount) {
        clearInterval(interval);
        document.querySelectorAll('input').forEach(el => el.value = '');
      }
    }, +step);
  }, delay);

});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}




