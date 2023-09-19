import {  Divider } from '@nextui-org/react'
import React from 'react'
import {WiHumidity} from 'react-icons/wi'
import {BsThermometerHalf} from 'react-icons/bs'
import {AiOutlineDashboard} from 'react-icons/ai'
import {MdAir} from 'react-icons/md'

const CurrentConditions = ({ weatherData }) => {

    return (
        <div className='p-4 bg-[#0c0a09] rounded-lg mb-4 text-white'>
            <div>
                Current Conditions
            </div>
            <Divider className='bg-gray-600 my-5'/>
            <div >
                <div className='flex justify-evenly'>
                    <div className=''>
                        <div className='mb-4'>
                            <span className='flex items-center '><BsThermometerHalf />Feels Like</span>
                            <p className='font-bold text-center'>{weatherData.feelsLike} <sup>o</sup>C</p>
                        </div>
                        <div>
                            <span className='flex items-center'> <WiHumidity /> Humidity</span>
                            <p className='text-center'>{weatherData.humidity} %</p>
                        </div>
                    </div>
                    <div>
                        <div className='mb-4'>
                        <span className='flex items-center'><AiOutlineDashboard />Pressure</span>
                            <p className='text-center '>{weatherData.pressure} hPa</p>
                        </div>
                        <div>
                        <span className='flex items-center'><MdAir />Wind</span>
                            <p className='text-center'>{weatherData.wind}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CurrentConditions