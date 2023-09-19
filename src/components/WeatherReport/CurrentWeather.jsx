import React from 'react'

import { Divider, } from "@nextui-org/react";
import { AiOutlineCalendar } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'
import { icons } from '../../utils';

const CurrentWeather = ({ weatherData }) => {
    
const icon = icons[weatherData.icon]

    return (

        <div className="min-w-[400px] rounded-md bg-[#0c0a09] text-white p-5 ">
            {/* <div className="flex gap-3"> */}
                <div className="flex flex-col justify-between">
                    <p className="text-sm mb-2 text-lg">Now</p>
                    <div className="detials flex items-center justify-evenly gap-3 text-3xl mb-2">
                        <p className='text-[3rem]'>{weatherData.temp} <sup>o</sup>C</p>
                        <img src={icon}  style={{height:'10vw'}}/>
                    </div>
                    <p className='text-[1.5rem]'>{weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}</p>
                </div>
            {/* </div> */}
            <Divider className='bg-gray-600 my-5'/>
            <div className='flex flex-col items-start'>
                <div className="flex items-center">
                    <span className='text-[1.5rem] mr-2'>
                        <AiOutlineCalendar />
                    </span>
                    <p>{weatherData.timezone}</p>
                </div>
                <div className="flex items-center">
                    <span className='text-[1.5rem] mr-2'><FiMapPin /></span>
                    <p>{weatherData.country}</p>
                </div>
            </div>
        </div>

    )
}

export default CurrentWeather