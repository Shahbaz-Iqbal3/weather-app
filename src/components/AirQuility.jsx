import "../App.css";
import AirChart from "./AirChart";
import { useEffect, useState } from "react";

function AirQuility({ latitude, longitude }) {

  const [airParticals, setAirParticals] = useState([])
  const [airComp, setAirComp] = useState([])
  let url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${ import.meta.env.VITE_API_KEY}`
  const airNames = ['CO', 'NO', "NO", 'O', 'SO', 'PM', 'PM', 'NH' ]
  const airNamesP = ['','',2,3,2,2.5,10,3]
  const apiIndex = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
  const getAirQuility = async () =>{
    const responce = await fetch(url)
    responce.json().then(data => {
      setAirParticals( (persentageCalc(data.list[0].components)))
      setAirComp(data.list[0].main.aqi)
     
    })
  }

  const persentageCalc = (airPartical) =>{
    const AirConstants = [15400,100,200, 180,350,75,200,200]
    let constant = Object.values(airPartical)
    return AirConstants.map((data, i) => {
      return Math.floor(constant[i]/data*100)
    })
    
  }
  useEffect(() => {
    getAirQuility(url)
  }, [url])
  
  return (
    <div className="w-full bg-[#14213d] rounded-lg min-h-[50px] shadow-xl text-white my-4 p-5 ">
      <div className="flex justify-start items-center gap-2">
        <h1 className="text-3xl font-popp font-bold mt-4 ml-2">Air Quality</h1>
        <span className={`${airComp<4? 'bg-green-700': 'bg-[#DE322E]'} rounded-lg font-popp p-1 px-2`}>{apiIndex[airComp-1]}</span>
      </div>
      <div className="flex flex-wrap justify-center items-center lg:gap-x-10 mt-3">
        {airParticals.map((each, index) =>{
          return < AirChart persent={each} key={index} gasName={airNames[index]} gasP={airNamesP[index]} />
         
        })}
      </div>
    </div>
  );
}

export default AirQuility;
