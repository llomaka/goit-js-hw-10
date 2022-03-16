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
  if (!value) {
    refs.list.innerHTML = '';
    refs.div.innerHTML = '';
    return Notify.warning('Please enter some text to input field!');
  }
  fetchCountries(value)
    .then(render)
    .catch(onSearchError);
};

function render(array) {
  if (array.length > 10) { Notify.info('Too many matches found. Please enter a more specific name.'); }
  else if (array.length > 1 && array.length <= 10) { renderList(array); }
  else if (array.length = 1) { renderInfo(array); }
}

function renderList(array) {
  refs.list.innerHTML = '';
  refs.div.innerHTML = '';
  const markup = array.map(item => `<li><img width="30" src="${item.flags.svg}" alt="Flag of ${item.name.common}"> ${item.name.official}</li>`).join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function renderInfo(array) {
  refs.div.innerHTML = '';
  refs.list.innerHTML = '';
  const markup = array.map(item => `<h1><img width="60" src="${item.flags.svg}">${item.name.official}</h1><ul><li><h2>Capital:</h2> ${item.capital.join(", ")}</li><li><h2>Population:</h2> ${item.population.toLocaleString()}</li><li><h2>Languages:</h2> ${Object.values(item.languages).join(", ")}</li></ul>`);
  refs.div.insertAdjacentHTML('beforeend', markup);
}

function onSearchError(error) {
  Notify.failure('Oops, there is no country with that name');
  console.log(error);
}
