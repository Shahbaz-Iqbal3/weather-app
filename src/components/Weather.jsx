import { useEffect, useState } from "react";
import weathersicon from "/weather.svg";
import pinLocation from "/location-pin.svg";
import unpinLocation from "/location-unpin.svg";
import humidityIcon from "/humidity.svg";
import feelslikeIcon from "/feelsLike.svg";
import windIcon from "/windy.svg";
import clearsky from "/clearsky.svg";
import clouds from "/clouds.svg";
import rain from "/rain.svg";
import heavyRain from "/heavyrain.svg";
import mist from "/mist.svg";
import snow from "/snow.svg";

function Weather(props) {
 const {latitude, longitude , isLocDenied} = props
  const [weather, setWeather] = useState([]);
  const [weathericon, setWeathericon] = useState(weathersicon);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const getWeatherIcon = (weathericon) => {
    switch (weathericon) {
      case "Clear":
        setWeathericon(clearsky);
        break;
      case "Clouds":
        setWeathericon(clouds);
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Tornado":
        setWeathericon(mist);
        break;
      case "Snow":
        setWeathericon(snow);
        break;
      case "Rain":
      case "Drizzle":
        setWeathericon(rain);
        break;
      case "Thunderstorm":
        setWeathericon(heavyRain);
        break;
      default:
        setWeathericon(weathersicon);
        break;
    }
  };

 



  const getDate = () => {
    let d = new Date();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  useEffect(() => {
    const getWeather = async (url) => {
      const response = await fetch(url);
      response.json().then((data) => {
        setWeather(data);
        getWeatherIcon(data.weather[0].main);
      });
    };
    getWeather(url);
   
  }, [url]);

  return (
    <>
      <div className="w-full sm:w-2/5 bg-[#14213d] rounded-lg min-h-[50px] shadow-xl text-white p-5 sm:mb-0 mb-5">
        <div className="h-[40px] w-full flex flex-wrap justify-between">
          <div className="flex flex-wrap  ">
            <div>
              <img
                src={isLocDenied ? unpinLocation : pinLocation}
                alt="weather icon"
                className="w-full h-full"
              />
            </div>
            <div className="pt-2 px-1 text-lg  font-popp">
              <span>
                {weather.name
                  ? weather.name + ", " + weather.sys.country
                  : "Lahore, PK"}
              </span>
            </div>
          </div>
          <div className="pt-2 px-1 text-lg  font-popp">
            <span>{getDate()}</span>
          </div>
        </div>

        <div className="flex justify-center flex-col items-center">
          <div className="relative w-full h-[230px]">
            <img
              className="absolute top-5 left-1/2 -translate-x-1/2 "
              src={weathericon}
              alt="weather icon"
            />
          </div>
          <div className="flex items-baseline justify-center">
            <div className="text-6xl font-bold font-mono">
              {weather.main ? Math.round(weather.main.temp) : "8"}
            </div>
            <div className="-translate-y-6 text-2xl">℃</div>
            <span className="font-popp ml-2 ">  {weather.weather ? weather.weather[0].main : "Clear Sky"} </span>
          </div>
        </div>
        <div className="flex items-center justify-around mt-[40px]">
          <div className="flex flex-col items-center">
            <div>
              <img src={humidityIcon} alt="humidity icon" />
            </div>
            <div className="text-sm mt-2">
              <span>
                Humidity: {weather.main ? weather.main.humidity : "100"}%
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <img src={windIcon} alt="humidity icon" />
            </div>
            <div className="text-sm mt-2">
              <span>Wind: {weather.wind ? weather.wind.speed : "5"} km/h</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <img src={feelslikeIcon} alt="humidity icon" />
            </div>
            <div className="text-sm mt-2">
              <span>
                Feels like:{" "}
                {weather.main ? Math.round(weather.main.feels_like) : "8"}℃
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
