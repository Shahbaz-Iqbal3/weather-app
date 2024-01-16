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
        dt: 1734393600,
        main: {
          temp: 2,
        },
      },
      {
        dt: 1734393600,
        main: {
          temp: 3,
        },
      },
      {
        dt: 1734393600,
        main: {
          temp: 5,
        },
      },
      {
        dt: 1734393600,
        main: {
          temp: 5,
        },
      },
      {
        dt: 1734393600,
        main: {
          temp: 5,
        },
      },
      {
        dt: 1734393600,
        main: {
          temp: 5,
        },
      },
      {
        dt: 1734393600,
        main: {
          temp: 5,
        },
      },
      {
        dt: 1734393600,
        main: {
          temp: 5,
        },
      },
    ],
  });

  const getForcastData = (num) => {
    const d = new Date();
    const months = [
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
    const tDate =
      Date.parse(
        `${d.getDate() + num} ${
          months[d.getMonth()]
        } ${d.getFullYear()} 00:00:00 GMT`
      ) / 1000;
    const arrayy = forcast.list.filter((data) => data.dt >= tDate);
    return arrayy.map((data) => data.main.temp);
  };

  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const getForcast = async (url) => {
    const responce = await fetch(url);
    responce.json().then((data) => {
      setforcast(data);
    });
  };

  useEffect(() => {
    getForcast(url);
  }, [url]);

  return (
    <div className="w-full sm:w-3/5 bg-[#14213d] rounded-lg shadow-xl text-white p-5 ">
      <h1 className="text-4xl font-popp font-bold mt-4 ml-2">Forcast</h1>
      <Line
        className="h-full"
        data={{
          labels: [
            "12AM",
            "03AM",
            "06AM",
            "09AM",
            "12PM",
            "03PM",
            "06PM",
            "09PM",
          ],
          datasets: [
            {
              tension: 0.4,
              fill: true,
              label: "Tomorrow",
              data: getForcastData(1),
              hoverOffset: 4,
            },
            
          ],
        }}
      />
    </div>
  );
}

export default Wgraph;
