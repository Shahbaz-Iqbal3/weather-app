

function AirChart({persent, gasName, gasP}) {
  return (
    <>
     <div className="progress-bar flex flex-col ">
          <div className="percent" title={`${gasName+gasP} concentration is currently ${persent} times the WHO annual air quality guideline value`}>
            <svg>
              <circle cx="105" cy="105" r="50" style={{ '--color' :  (persent<100 ? "rgba(135, 212, 245, 0.3)" : '#DE322E')  }}></circle>
              <circle
                cx="105"
                cy="105"
                r="50"
                style={{ "--percent": persent,'--color' :  (persent<100 ? "#38BDF8" : '#DE322E') }}
              ></circle>
            </svg>
            <div className="number">
              <h3>
                {persent}<span>%</span>&#8593;
              </h3>
            </div>
          </div>
          <div className=" -translate-y-7 text-xl">{gasName}<span><sub>{gasP}</sub></span></div>
        </div>
    </>
  )
}

export default AirChart