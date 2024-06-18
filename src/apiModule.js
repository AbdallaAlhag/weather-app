const key =  '44a89006814d400793e172154241406';
// lets create a simple weather fetch call

export async function getRealTimeWeather(city){
    
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`, {mode: 'cors'})
        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    }catch (err){
        console.log('fetch error:', err)
        return null;
    }
}


export async function getForecastWeather(city){
    
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}`, {mode: 'cors'})
        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    }catch (err){
        console.log('fetch error:', err)
        return null;
    }
}

export async function displayRealTimeWeather(city) {
    try {
      const weatherData = await getRealTimeWeather(city);
      console.log(weatherData)
      // return weatherData.location.name;
      return weatherData;
    } catch (err) {
      console.log(err)
    }
  }

  export async function displayForecastWeather(city) {
    try {
      const weatherData = await getForecastWeather(city);
      console.log(weatherData)
      // return weatherData.location.name;
      return weatherData;
    } catch (err) {
      console.log(err)
    }
  }