import { useEffect } from "react";
import Chart from "chart.js/auto";
import { useState } from "react";
import { Line } from "react-chartjs-2";

function Wgraph({ latitude, longitude }) {
  Chart.defaults.scales.linear.min = 0;
  Chart.defaults.scales.linear.max = 30;

  const [forcast, setforcast] = useState({
    list: [
      {
        main: {
          temp: 2,
        },
      },
      {
        main: {
          temp: 3,
        },
      },
      {
        main: {
          temp: 5,
        },
      },
      {
        main: {
          temp: 5,
        },
      },
      {
        main: {
          temp: 5,
        },
      },
      {
        main: {
          temp: 5,
        },
      },
      {
        main: {
          temp: 5,
        },
      },
      {
        main: {
          temp: 5,
        },
      },
    ],
  });

  console.log();
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const getForcast = async (url) => {
    const responce = await fetch(url);
    responce.json().then((data) => {
      setforcast(data);
    
    });
  }; 

  useEffect(()=>{
    getForcast(url)
  },[url])

  return (
    <div className="w-full sm:w-3/5 bg-[#14213d] rounded-lg shadow-xl text-white p-5 ">
      <h1 className="text-4xl font-popp font-bold mt-4 ml-2">Forcast</h1>
      <Line
        className="h-full"
  
        data={{
          labels: [
            "06AM",
            "09AM",
            "12PM",
            "03PM",
            "06PM",
            "09PM",
            "12AM",
            "03AM",
          ],
          datasets: [
            {
              tension: 0.4,
              fill: true,
              label: "Today",
              data: forcast.list.map((data) => data.main.temp) ,
              hoverOffset: 4
            },
          ],
        }}
      />
    </div>
  );
}

export default Wgraph;
