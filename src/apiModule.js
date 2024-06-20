const key = '44a89006814d400793e172154241406';
// lets create a simple weather fetch call

export async function getRealTimeWeather(city) {

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`, { mode: 'cors' })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (err) {
    console.log('fetch error:', err)
    return null;
  }
}

export async function displayRealTimeWeather(city) {
  try {
    const weatherData = await getRealTimeWeather(city);
    // console.log(weatherData)
    // return weatherData.location.name;
    return weatherData;
  } catch (err) {
    console.log(err)
  }
}

export async function getForecastWeather(city) {

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}`, { mode: 'cors' })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (err) {
    console.log('fetch error:', err)
    return null;
  }
}


export async function displayForecastWeather(city) {
  try {
    const weatherData = await getForecastWeather(city);
    // console.log(weatherData)
    return weatherData;
  } catch (err) {
    console.log(err)
  }
}


// export async function getWeatherHistory(city) {

//   try {
//     const date = getTodaysDate();
//     const response = await fetch(`http://api.weatherapi.com/v1/history.json?key=${key}&q=${city}&dt=${date}`, { mode: 'cors' })
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data
//   } catch (err) {
//     console.log('fetch error:', err)
//     return null;
//   }
// }

// function getTodaysDate() {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
//   const day = String(today.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }


// export async function displayWeatherHistory(city) {
//   try {
//     const weatherData = await getWeatherHistory(city);
//     console.log(weatherData)
//     // return weatherData.location.name;
//     return weatherData;
//   } catch (err) {
//     console.log(err)
//   }
// }


export async function fetchWeeklyWeather(city) {
  const today = new Date();
  try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&dt=${today}&days=7`, { mode: 'cors' })
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
