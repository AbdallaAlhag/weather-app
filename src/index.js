import './style.css';
import 'boxicons/css/boxicons.min.css';
import { loadPage } from './loadPage';
import feelslikeIcon from './assets/feelslike.png'
import humidityIcon from './assets/humidity.png';
import rainIcon from './assets/rain.png';
import windIcon from './assets/wind.png';


// Fetch user's location usuing IP Geolocation

var requestOptions = {
    method: 'GET',
};

fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=1271aac6cba64f569aca822821a60e5c", requestOptions)
    .then(response => response.json())
    .then(result => loadPage(result.city.name))
    .catch(error => {
        console.log('error', error);
        loadPage("San Francisco");
    });

// loadPage('San Francisco');

// const submit = document.querySelector('.image-button');


// submit.addEventListener('click', function (event) {
//     event.preventDefault()
//     const search = document.querySelector("#search-input").value;
//     loadPage(search);
// })

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-bar');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const userInput = document.getElementById('search-input').value.trim();
        const feedback = document.getElementById('feedback');

        const isValid = await validateCity(userInput);
        if (isValid) {
            feedback.textContent = '';
            loadPage(userInput);
            // feedback.style.color = 'green';
        } else {
            feedback.textContent = 'Location not found.';
            // feedback.style.color = 'white';
        }
    });

    async function validateCity(input) {
        const apiKey = '44a89006814d400793e172154241406';
        const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
        const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(input)}&days=1`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404) {
                    return false; // City not found
                }
                throw new Error('Error fetching weather data');
            }
            const cityData = await response.json();
            // The API's response includes a location object with name property
            return cityData && cityData.location 
            // && cityData.location.name.toLowerCase() === input.toLowerCase();
        } catch (error) {
            console.error('Fetch error: how', error);
            return false;
        }
    }

});