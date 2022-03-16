import './css/styles.css';
import { debounce } from "debounce";
import { Notify } from 'notiflix';
import getRefs from './getRefs';
import { fetchCountries } from './fetchCountries';

const refs = getRefs();
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

Notify.init({ fontSize: '18px', });

function onInput(event) {
  event.preventDefault();
  const value = event.target.value.trim();
  if (!value) return Notify.warning('Please enter some text to input field!');
  console.log(value);
  fetchCountries(value)
    .then(renderList)
    .catch(onSearchError);
  event.reset();
};

function renderList(result) {
  console.log(result);
  refs.list.innerHTML = '';
  refs.div.innerHTML = '';
  const markup = result.map(item => `<li><svg width="20" height="20"><use width="20" height="20" href="${item.flags.svg}"></use></svg> ${item.name.official}</li>`).join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function renderInfo(array) {
  refs.div.innerHTML = '';
  refs.list.innerHTML = '';
  const markup = array[0](item => `<svg><use href="${item.path}"></use></svg><h0>${item}</h0><ul><li>${item}</li><li>${item}</li><li>${item}</li></ul>`);
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function onSearchError(error) {
  Notify.failure('Oops, there is no country with that name');
  console.log(error);
}
