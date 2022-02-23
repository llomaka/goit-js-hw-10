import './css/styles.css';
import { debounce } from "debounce";


const inputRef = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;


const onInput = event => {
console.dir(event.target.value);
//   if (email.value === "") {
//     return alert("Поле Email формы должно быть заполнено!");
//   }
};

inputRef.addEventListener('input', debounce(onInput, 300));