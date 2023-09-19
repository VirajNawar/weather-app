import React, { useEffect, useState } from 'react'
import { fetchDailyOrHourlyWeather } from '../../utils'
import { Card,  CardHeader, Divider } from '@nextui-org/react';
import { icons } from '../../utils';

const DailyWeather = ({ lon, lat }) => {

  const [dailyData, setDailyData] = useState([])

  const currentDate = new Date()
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function extractDailyData(list) {
    const dailyData = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];

      if (!dailyData[day]) {
        dailyData[day] = item;
      }
    });

    return Object.values(dailyData);
  }

  useEffect(() => {

    fetchDailyOrHourlyWeather(lon, lat).
      then((data) => {
        const newDailyData = extractDailyData(data.list)
        setDailyData(newDailyData)
      }).catch((err) => {
        console.log("Daily Data :", err);
      })

  }, [lon, lat])

  return (

      <Card className='mt-5 bg-[#0c0a09] px-2 text-white hide-scrollbar flex '>
        <CardHeader>
          5-Day Forecast
        </CardHeader>
        <Divider className='bg-[#292524] my-3'/>
        <div className='flex flex-wrap justify-around items-center gap-8'>
          {
            dailyData.map((item, index) => (
               
              <div className='p-3 bg-[#131214] rounded-lg mb-5 text-center'  key={index}>
                {
                  daysOfWeek[new Date(item.dt_txt.split(" ")[0]).getDay()] === currentDate.toDateString()
                    ? <p>Today</p> 
                    : 
                    <p>
                      {daysOfWeek[new Date(item.dt_txt.split(" ")[0]).getDay()]}
                    </p>
                }
                <img src={icons[item.weather[0].icon]} />
                <p>{item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}</p>
              </div>
            ))
          }
        </div>
      </Card>

  )
}

export default DailyWeather