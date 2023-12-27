import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { UnixToDate } from "./assets/components/functions";

export default function Week(props) {
  const { apiData, state,convertTemperature } = props;

 

  const [dailyTemps, setDailyTemps] = useState([]);

  useEffect(() => {
    const tempData = apiData.daily.map((day) => ({
      date: UnixToDate(day.dt),
      max: convertTemperature(day.temp.max, state.testDegree),
      min: convertTemperature(day.temp.min, state.testDegree),
      feel: day.weather[0].description,
      icon: day.weather[0].icon,
    }));
    setDailyTemps(tempData);
  }, [convertTemperature]);

  return (
    <div className="Week forecast-border bg-white">
      <h2 className="text-left font-semibold">Daily</h2>
      <div className="forecast-div flex-row text-center">
        {dailyTemps.map((day, i) => (
          <div key={i} className="forecast-border weather-box">
            <p className="tracking-wide">{day.date}</p>
            <img
              src={`http://openweathermap.org/img/w/${day.icon}.png`}
              alt=""
              className="h-min"
            />
            <p className="capitalize text-xs w-max">{day.feel}</p>
            <div>
              <p className="text-sm">
                H: {day.max}
              </p>
              <p className="text-sm">
                L: {day.min}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Week.propTypes = {
  apiData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  convertTemperature: PropTypes.func.isRequired,
};
