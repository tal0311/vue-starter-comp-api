const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY

async function getWeatherByLocation({ lat, lng }) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${WEATHER_KEY}`
  )

  const weatherData = await response.json()
  const weather = {
    temp: kelvinToCelsius(weatherData.main.temp),
    name: weatherData.name,
    humidity: weatherData.main.humidity + '%',
    desc: weatherData.weather[0].description,
    windSpeed: weatherData.wind.speed + ' Knots'
  }
  return weather
}

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(0) + '°C' // Rounds the result to 2 decimal places
}

export const weatherService = {
  getWeatherByLocation
}
