import {
    displayRealTimeWeather,
    displayForecastWeather,
    fetchWeeklyWeather,
} from "./apiModule";
import { format,parse } from 'date-fns';
import { displayChart } from "./card";

export function loadPage(city) {
    createMainInfo(city);
    createSideInfo(city);
    createHistory(city);
    displayChart(city);
}

// includes city, weather, temp, high, low
function createMainInfo(city) {
    // lets create a simple weather fetch call

    const cityName = document.querySelector("#city");
    const currentWeather = document.querySelector("#weather");
    const date = document.querySelector("#date");
    const temperature = document.querySelector("#temp");
    const weatherIcon = document.querySelector("#weather-icon");

    // p.textContent = displayWeather('london');
    displayRealTimeWeather(city)
        .then((weather) => {
            if (weather) {
                currentWeather.textContent = weather.current.condition.text;
                cityName.textContent = weather.location.name + ", " + weather.location.region;

                const dateTimeString = weather.location.localtime;
                const dateString = parse(dateTimeString, 'yyyy-MM-dd HH:mm', new Date());
                const formattedDate = format(dateString, "dd MMM ''yy HH:mm");
                date.textContent = formattedDate;

                temperature.textContent = weather.current.temp_f + "°F";
                weatherIcon.src = weather.current.condition.icon;
                weatherIcon.alt = weather.current.condition.text;
            } else {
                // cityName.textContent = "Error Fetching Weather";
                // currentWeather.textContent = "";
                // date.textContent = "";
                // temperature.textContent = "";
                // weatherIcon.src = "";
                // weatherIcon.alt = "";
            }
        })
        .catch((err) => {
            console.log(err)
            // cityName.textContent = "Error fetching weather";
            // currentWeather.textContent = "";
            // date.textContent = "";
            // temperature.textContent = "";
            // weatherIcon.src = "";
            // weatherIcon.alt = "";
        });
}

function createSideInfo(city) {
    const feelsLike = document.querySelector("#feels");
    const humidity = document.querySelector("#humidity");
    const chanceOfRain = document.querySelector("#rain-chance");
    const windSpeed = document.querySelector("#wind-speed");

    // Not really side info, might reformat and change name
    const low = document.querySelector("#low");
    const high = document.querySelector("#high");

    displayForecastWeather(city)
        .then((weather) => {
            if (weather) {
                feelsLike.textContent = weather.current.feelslike_f + "°F";
                humidity.textContent = weather.current.humidity + "%";
                chanceOfRain.textContent =
                    weather.forecast.forecastday[0].day.daily_chance_of_rain + " %";
                windSpeed.textContent =
                    weather.forecast.forecastday[0].day.maxwind_mph + " mph";
                low.innerHTML = `<i class='bx bx-down-arrow-alt' ></i>  ${weather.forecast.forecastday[0].day.mintemp_f}`;
                high.innerHTML = `<i class='bx bx-up-arrow-alt' ></i>  ${weather.forecast.forecastday[0].day.maxtemp_f}`;
            } else {
                // feelsLike.textContent = "Error fetching weather";
                // humidity.textContent = "";
                // chanceOfRain.textContent = "";
                // windSpeed.textContent = "";
            }
        })
        .catch((err) => {
            // feelsLike.textContent = "Error fetching weather";
            // humidity.textContent = "";
            // chanceOfRain.textContent = "";
            // windSpeed.textContent = "";
            console.log(err)
        });
}

function createHistory(city) {
    try{
        fetchWeeklyWeather(city).then((weatherData) => {
    
            if (weatherData && weatherData.forecast && weatherData.forecast.forecastday) {
                const ticks = document.querySelectorAll(".tick"); // Select all tick elements
    
                weatherData.forecast.forecastday.forEach((dayData, index) => {
                    const current = ticks[index]
                    const temperature = current.querySelector(".value--this");
                    const dayOfTheWeek = current.querySelector('.day-name');
                    const dayOfTheMonth = current.querySelector('.day-number');
                    const highLow = current.querySelector('.high-low');
                    const tempIcon = current.querySelector('.icon');
    
                    temperature.textContent = Math.ceil(dayData.day.avgtemp_f) + "°F";
                    dayOfTheWeek.textContent = format(dayData.date, 'EEEE');
                    dayOfTheMonth.textContent = format(dayData.date, 'dd MMM');
                    highLow.textContent = "L: "+ Math.ceil(dayData.day.mintemp_f) +" / H: " +  Math.ceil(dayData.day.maxtemp_f);
                    tempIcon.src = dayData.day.condition.icon;
                    tempIcon.alt = 'Day Condition Icon'
                });
            } else {
                console.error("Invalid weather data structure.");
            }
        });
    } catch (error){
        console.log(error)
    }
}
