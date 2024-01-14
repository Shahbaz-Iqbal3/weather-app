import Weather from "./components/weather";
import Wgraph from "./components/Wgraph";
import AirQuility from "./components/AirQuility";

import { useEffect, useState } from "react";
function App() {
  const [latitude, setLatitude] = useState(31.59);
  const [longitude, setLongitude] = useState(74.41);
  const [isLocDenied, setIsLocDenied] = useState(false);

   const getGeoLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        // success callback
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        // error callback
        (error) => {
          error ? setIsLocDenied(true) : setIsLocDenied(false);
        }
      );
  };

  useEffect(() => {
    getGeoLocation()
  
    
  }, [])
  
  return (
    
    <>
      <div className="w-full bg-[#000000]  py-8 h-full md:px-3">
        <div className="container m-auto">
        <h1 className="text-5xl font-popp font-bold text-center mb-4 text-white">Weather</h1>
        <div className="container sm:flex sm:gap-5">
          <Weather latitude={latitude} longitude={longitude} isLocDenied={isLocDenied} />
          <Wgraph latitude={latitude} longitude={longitude} />
        </div>
        <div className="block ">
          <AirQuility latitude={latitude} longitude={longitude}  />
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
