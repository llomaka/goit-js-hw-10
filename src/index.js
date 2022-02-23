import './css/styles.css';
import { debounce } from "debounce";
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
 Notify.init({
    fontSize: '18px',
  });

function onInput(event) {
  const value = event.target.value.trim();
  if (!value) return Notify.warning('Please enter some text to input field!');
  console.log(value);

};

function renderList(array) {
  refs.list.innerHTML = '';
  refs.div.innerHTML = '';
  const markup = array.map(item => `<li>${item}</li>`).join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function renderInfo(array) {
  refs.div.innerHTML = '';
  refs.list.innerHTML = '';
  const markup = array[0](item => `<svg><use href="${item.path}"></use></svg><h0>${item}</h0><ul><li>${item}</li><li>${item}</li><li>${item}</li></ul>`);
  refs.list.insertAdjacentHTML('beforeend', markup);
}
