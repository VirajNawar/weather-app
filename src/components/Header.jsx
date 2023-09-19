import React, { useEffect, useState } from 'react'

import logo from '../assets/images/logo.png'
import { IoMdLocate } from 'react-icons/io'
import { FaSearch } from 'react-icons/fa';
import { getPosition, getWeather } from '../utils';



const Header = ({ onSearch, location }) => {

    const [value, setValue] = useState('')


    const handleSearch = (e) => {
        const newValue = e.target.value
        setValue(newValue)
    }

    const handlClick = () => {
        onSearch(value)
    }

    const handleLocation = () =>{
        if (navigator.geolocation) {
            getPosition()
              //If user allow location service then will fetch data & send it to get-weather function.
              .then((position) => {
                getWeather(position.coords.latitude, position.coords.longitude).
                then((data)=>{
                  setValue(data.name)
                  onSearch(data.name)
                  console.log("location--data---: ",data);
                }).catch((err)=>{
                  console.log("Error: ",err);
                  
                });
              })
              .catch((err) => {
                //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
                getWeather(28.67, 77.22).
                then((data)=>{
                  setValue(data.name)
                });
                alert(
                  "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
                );
                console.log("Error: ",err);
              });
          } else {
            alert("Geolocation not available");
          }
    }

    useEffect(()=>{
        handleLocation()
      },[])
   

    return (
        <div className='p-2'>
            <header className='flex justify-around items-center'>
                <a href="#" className="logo" >
                    <img src={logo} alt="logo" width='364' height='38' />
                </a>

                <div className="relative flex h-10">
                    <input
                        type="text"
                        onInput={(e) => handleSearch(e)}
                        placeholder="Search..."
                        value={value}
                        className="p-3 rounded-lg bg-[#0c0a09] focus:outline-none focus:border-[#e86e0b] flex-1"
                    />
                    <div className="absolute inset-y-0 right-2  flex items-center cursor-pointer">
                        <FaSearch className="text-gray-500 hover:text-white" onClick={handlClick} />
                    </div>
                </div>

                <button className='flex items-center p-2 rounded bg-orange-600 hover:bg-black hover:text-orange-400' onClick={handleLocation}>
                    <IoMdLocate className="text-2xl " />
                    <span className="md:flex sm:flex hidden ml-2"> Current Location</span>
                </button>
            </header>
        </div>
    )
}

export default Header