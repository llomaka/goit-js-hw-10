const BASE_URL = 'https://restcountries.com/v2';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`).then(response => response.json()).catch(error => console.log(error));
}