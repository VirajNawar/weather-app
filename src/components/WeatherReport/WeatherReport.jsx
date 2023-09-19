import React, { useEffect, useState } from 'react'
import { fetchWeather } from '../../utils';
import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';
import CurrentConditions from './CurrentConditions';

const WeatherReport = ({ searchData, location }) => {

  const [weatherData, setWeatherData] = useState({
    description: "",
    lon: 0,
    lat: 0,
    temp: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
    timezone: "",
    feelsLike: 0,
    humidity: 0,
    pressure: 0,
    wind: 0
  })

  useEffect(() => {

    if (searchData) {

      fetchWeather(searchData)
        .then((data) => {
          setWeatherData({
            description: data.weather[0].description,
            lon: data.coord.lon,
            lat: data.coord.lat,
            temp: Math.round(data.main.temp - 273.15),
            country: data.sys.country,
            timezone: new Date((data.dt * 1000) - data.timezone).toDateString(),
            feelsLike: Math.round(data.main.feels_like - 273.15),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            icon: data.weather[0].icon
          });

        })
        .catch((error) => {
          console.error('Error:', error);
          setWeatherData({})
        });
    } else if(location){
      // setWeatherData(location)
      console.log(location);
    }
  }, [searchData])


  return (
    <div className='flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center'>
      <div className=' mr-8 '>
        <CurrentWeather weatherData={weatherData} />
        <HourlyWeather lon={weatherData.lon} lat={weatherData.lat} />
      </div>
      <div className='w-full'>
        <CurrentConditions weatherData={weatherData} />
        <DailyWeather lon={weatherData.lon} lat={weatherData.lat} />
      </div>
    </div>
  )
}

export default WeatherReport