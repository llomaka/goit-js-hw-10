import './css/styles.css';
import { debounce } from "debounce";
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';


const inputRef = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;


const onInput = event => {
  const value = event.target.value.trim();
  console.log(value);
  if (value === "") {
    return Notify.warning("Search field should be populated!");
  }
};

inputRef.addEventListener('input', debounce(onInput, 300));