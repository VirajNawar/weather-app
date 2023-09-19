import React, { useEffect, useState } from 'react'
import { fetchDailyOrHourlyWeather } from '../../utils'
import { icons } from '../../utils';

import { Divider } from "@nextui-org/react";

const HourlyWeather = ({ lon, lat }) => {

    const [hourlyData, setHourlyData] = useState([])

    useEffect(() => {
        fetchDailyOrHourlyWeather(lon, lat).
            then((data) => {
                setHourlyData(data.list.slice(0, 5))
            }).catch((error) => {
                console.log("Hourly Data", error);
            })
    }, [lon,lat])

    return (
        <div className='min-w-[400px] rounded-lg mt-2 bg-[#0c0a09] p-4 text-white'>
            <div>
                Hourly Forecast 
            </div>
            <Divider className='bg-gray-600 my-5'/>
            {
                hourlyData.map((item, index) =>
                (
                    <>
                        <div className='my-5'>
                            <div className="flex justify-around items-center gap-2 text-sm" key={index}>
                                <img src={icons[item.weather[0].icon]} style={{height:'4vw'}}/><span className='text-[1.2rem]'>{Math.round(item.main.temp - 273.15)}<sup>0</sup>C</span>
                                <p className='text-[1.2rem]'>{
                                    item.dt_txt.split(" ")[1].split(":")[0] >= 12
                                        ?
                                        item.dt_txt.split(" ")[1].split(":")[0] % 12 === 0 ? 12 + ' pm'
                                            :
                                            item.dt_txt.split(" ")[1].split(":")[0] % 12 + 'pm'
                                        :
                                        item.dt_txt.split(" ")[1].split(":")[0] % 12 === 0 ? 12 + ' am'
                                            :
                                            item.dt_txt.split(" ")[1].split(":")[0] % 12 + 'am'

                                }</p>


                            </div>
                        </div>
                        <Divider className='bg-gray-800 '/>
                    </>
                )
                )
            }

        </div>
    )
}

export default HourlyWeather