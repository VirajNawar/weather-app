import { useEffect, useState } from "react"
import Header from "./components/Header"
import WeatherReport from "./components/WeatherReport/WeatherReport"
import { getPosition, getWeather } from "./utils"
import { Dna } from  'react-loader-spinner'


function App() {

  const [searchData, setSearchData] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  
  const handleSearch = ((value) =>{
    setSearchData(value)
  })
  

  const handleLocation = () => {
    if (navigator.geolocation) {
      setShowLoader(true)
      getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          setShowLoader(false)
          getWeather(position.coords.latitude, position.coords.longitude).
          then((data)=>{
            setSearchData(data.name)
            console.log("location--data---: ",data);
          }).catch((err)=>{
            console.log("Error: ",err);
            
          });
        })
        .catch((err) => {
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          getWeather(28.67, 77.22).
          then((data)=>{
            setSearchData(data.name)
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

    <div className=" p-2">
      <Header onSearch={handleSearch} />
      {
        showLoader ? 
        (<div className='min-h-[100vh] flex flex-col items-center justify-center'>
          <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
<div className='mt-4'>
<h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
</div>
        </div>)
        :
        <WeatherReport searchData={searchData}  />
      }
      
    </div>

  )
}

export default App
