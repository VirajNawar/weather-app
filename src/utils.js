import icon_01d from './assets/images/weather_icons/01d.png'
import icon_01n from './assets/images/weather_icons/01n.png'
import icon_02d from './assets/images/weather_icons/02d.png'
import icon_02n from './assets/images/weather_icons/02n.png'
import icon_03d from './assets/images/weather_icons/03d.png'
import icon_03n from './assets/images/weather_icons/03n.png'
import icon_04d from './assets/images/weather_icons/04d.png'
import icon_04n from './assets/images/weather_icons/04n.png'
import icon_09d from './assets/images/weather_icons/09d.png'
import icon_09n from './assets/images/weather_icons/09n.png'
import icon_10d from './assets/images/weather_icons/10d.png'
import icon_10n from './assets/images/weather_icons/10n.png'
import icon_11n from './assets/images/weather_icons/11n.png'
import icon_11d from './assets/images/weather_icons/11d.png'
import icon_13d from './assets/images/weather_icons/13d.png'
import icon_13n from './assets/images/weather_icons/13n.png'
import icon_50d from './assets/images/weather_icons/50d.png'
import icon_50n from './assets/images/weather_icons/50n.png'


const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '98969f6c0ccfd856cab3cc18801855a0'


const icons = {
  '01d': icon_01d,
  '01n': icon_01n,
  '02d': icon_02d,
  '02n': icon_02n,
  '03d': icon_03d,
  '03n': icon_03n,
  '04d': icon_04d,
  '04n': icon_04n,
  '09d': icon_09d,
  '09n': icon_09n,
  '10d': icon_10d,
  '10n': icon_10n,
  '11d': icon_11d,
  '11n': icon_11n,
  '13d': icon_13d,
  '13n': icon_13n,
  '50d': icon_50d,
  '50n': icon_50n
}

const fetchWeather = async (city) => {
  const res = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`)
  const data = await res.json()
  return data
}


const fetchDailyOrHourlyWeather = async (lon, lat) => {
  const res = await fetch(`${BASE_URL}/forecast?lon=${lon}&lat=${lat}&appid=${API_KEY}`)
  const data = await res.json()
  return data
}



const getPosition = (options) => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const getWeather = async (lat, lon) => {
  const api_call = await fetch(
    `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`
  );
  const data = await api_call.json();
  return data
}
export { icons, getPosition, getWeather, fetchWeather, fetchDailyOrHourlyWeather }



