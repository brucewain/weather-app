import PropTypes from "prop-types";
import { useEffect } from "react";
import { convertUnixTimestampToHoursAMPM } from "./assets/components/functions";

export default function Hourly(props) {
  const { apiData, state,convertTemperature } = props;



  useEffect(() => {}, [apiData]);

  return (
    <div className="Hourly forecast-border bg-white ">
      <h2 className="text-left font-semibold">Hourly</h2>
      <div className="forecast-div">
        {apiData.hourly.map((openWeather, i) => (
          <div key={i} className="forecast-border w-fit weather-box">
            {/* Time */}
            <p className="tracking-wider">
              {convertUnixTimestampToHoursAMPM(openWeather.dt)}
            </p>
            {/* Icon */}
            <img
              src={`http://openweathermap.org/img/w/${openWeather.weather[0].icon}.png`}
              alt=""
            />
            {/* Temp */}
            <p className="text-sm">
              {convertTemperature(openWeather.temp, state.testDegree)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

Hourly.propTypes = {
  apiData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  convertTemperature: PropTypes.func.isRequired,
};
