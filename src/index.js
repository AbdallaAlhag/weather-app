import './style.css';
import 'boxicons/css/boxicons.min.css';
import { loadPage } from './loadPage';
import feelslikeIcon from './assets/feelslike.png'
import humidityIcon from './assets/humidity.png';
import rainIcon from './assets/rain.png';
import windIcon from './assets/wind.png';

loadPage('antioch');

const submit = document.querySelector('.image-button');

submit.addEventListener('click', function(event) {
    event.preventDefault()
    const search = document.querySelector("#search-input").value;
    loadPage(search);
})

