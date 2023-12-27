import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Daily(props) {
  const { apiData, city, setTemp, temp, state } = props;

  const [feelsLike, setFeelsLike] = useState(apiData.current.feels_like);
  const [low, setLow] = useState(apiData.daily[0].temp.min);
  const [high, setHigh] = useState(apiData.daily[0].temp.max);

  const convertTemperature = (temperature, degree) => {
    if (degree === "F") {
      return ((temperature - 273.15) * 1.8 + 32).toFixed(0);
    } else if (degree === "C") {
      return (temperature - 273.15).toFixed(0);
    }
    return temperature;
  };

  useEffect(() => {
    setTemp(convertTemperature(apiData.current.temp, state.testDegree));
    setFeelsLike(
      convertTemperature(apiData.current.feels_like, state.testDegree)
    );
    setLow(convertTemperature(apiData.daily[0].temp.min, state.testDegree));
    setHigh(convertTemperature(apiData.daily[0].temp.max, state.testDegree));
  }, [state.testDegree]);

  return (
    <div className="Daily  p-2 justify-between text-center forecast-border gap-x-2 bg-white">
      <div className="grow flex justify-between">
        <h2 className="text-left  font-semibold">Current Weather</h2>
      </div>

      <div className="grow text-center flex justify-between gap-x-8">
        <div className="p-2">
          <p className=" fas fa-map-marker-alt capitalize font-medium">
            {city}
          </p>
          <div className="flex flex-row items-center  justify-center">
            <img
              src={`http://openweathermap.org/img/w/${apiData.current.weather[0].icon}.png`}
              alt=""
            />
            <p>
              {temp}°{state.testDegree}
            </p>
          </div>
          <p className="capitalize">{apiData.current.weather[0].description}</p>
        </div>

        <div className="text-left p-2 grow">
          <div className="current-weather-data ">
            <p>Feels like</p>{" "}
            <p>
              {feelsLike}°{state.testDegree}
            </p>
          </div>

          <div className="current-weather-data ">
            <p>
              H: {high}°{state.testDegree}
            </p>{" "}
            <p>
              L: {low}°{state.testDegree}
            </p>{" "}
          </div>

          <div className="current-weather-data">
            <p>Humidity</p>
            <p>{apiData.current.humidity}%</p>
          </div>
          <div className="current-weather-data">
            <p>Wind Speed</p>
            <p>{apiData.current.wind_speed}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Daily.propTypes = {
  apiData: PropTypes.object.isRequired,

  city: PropTypes.string.isRequired,
  setTemp: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  setDegree: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  current: PropTypes.object.isRequired,
};
