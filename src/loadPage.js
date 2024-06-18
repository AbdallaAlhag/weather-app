import { displayRealTimeWeather, displayForecastWeather } from './apiModule';


export function loadPage(city) {
    createMainInfo(city);    
    createSideInfo(city);
}

// includes city, weather, temp, high, low
function createMainInfo(city) {

    // lets create a simple weather fetch call
    
    const cityName = document.querySelector('#city');
    const currentWeather = document.querySelector('#weather');
    const date = document.querySelector('#date');
    const temperature = document.querySelector('#temp');
    const weatherIcon = document.querySelector('#weather-icon');

    // p.textContent = displayWeather('london');
    displayRealTimeWeather(city).then(weather => {
        if (weather) {
            currentWeather.textContent = weather.current.condition.text
            cityName.textContent = weather.location.name + ', ' + weather.location.region;
            date.textContent = weather.location.localtime;
            temperature.textContent = weather.current.temp_f + '°F';
            weatherIcon.src = weather.current.condition.icon;
            weatherIcon.alt = weather.current.condition.text; 
        } else {
            cityName.textContent = 'error fetching weather';
            currentWeather.textContent = '';
            date.textContent = '';
            temperature.textContent = '';
            weatherIcon.src = '';
            weatherIcon.alt = ''; 
        }
    
    }).catch(err => {
        cityName.textContent = 'Error fetching weather';
        currentWeather.textContent = '';
        date.textContent = '';
        temperature.textContent = '';
        weatherIcon.src = '';
        weatherIcon.alt = ''; 
    });
}


function createSideInfo(city){

    const container = document.querySelector('.container');

    const feelsLike = document.querySelector('#feels');
    const humidity = document.querySelector('#humidity');
    const chanceOfRain = document.querySelector('#rain-chance');
    const windSpeed = document.querySelector('#wind-speed');

    displayForecastWeather(city).then(weather => {
        if (weather) {
            feelsLike.textContent = weather.current.feelslike_f + '°F';
            humidity.textContent = weather.current.humidity + '%';
            chanceOfRain.textContent = weather.forecast.forecastday[0].day.daily_chance_of_rain + " %";
            windSpeed.textContent = weather.forecast.forecastday[0].day.maxwind_mph + " mph";
        } else {
            feelsLike.textContent = 'Error fetching weather';
            humidity.textContent = '';
        }
    
    }).catch(err => {
        feelsLike.textContent = 'Error fetching weather';
        humidity.textContent = '';
    });
}