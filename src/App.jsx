import { useState, useEffect, useReducer } from "react";
import axios from "axios";

// import "./App.css";
import Hourly from "./Hourly";
import Week from "./Week";
import Daily from "./Daily";
import Search from "./Search";
import "/Users/admin/weather-app/src/index.css";
import userReducer from "/Users/admin/weather-app/src/assets/components/reducer.jsx";

function App() {
  // State
  const [apiData, setApiData] = useState();

  const [setCity, setGetCity] = useState("Los Angeles");
  const [city, setNewState] = useState("Los Angeles");

  const [lat, setNewLat] = useState(34.0549);
  const [lon, setNewLon] = useState(-118.2426);

  // API KEY AND URL
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const geoCodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  const [temp, setTemp] = useState(null);

  // REDUCER

  const initialState = { testDegree: "F" };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const toggleDegree = () => dispatch({ type: "TOGGLE_DEGREE" });

  // API CALL
  useEffect(() => {
    const fetchData = async () => {
      try {

        // AQUIRE DATA
        const apiDataResponse = await axios.get(apiUrl);
        setApiData(apiDataResponse.data);

        // GEOCODING URL
        const getDataResponse = await axios.get(geoCodingUrl);
        const newApiCall = getDataResponse[0];
        setNewLat(newApiCall.lat);
        setNewLon(newApiCall.lon);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [apiUrl, geoCodingUrl]);

  const inputHandler = (e) => {
    setGetCity(e.target.value);
    e.preventDefault();
  };

  const submitHandler = (e) => {
    setNewState(setCity);

    if (setNewState.length == 0) {
      e.preventDefault;
      console.log("nope");
    }
  };

  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9) / 5 + 32;
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const convertTemperature = (temperature, degree) => {
    if (degree === "F") {
      return ((temperature - 273.15) * 1.8 + 32).toFixed(0)+ "°F";
    } else if (degree === "C") {
      return (temperature - 273.15).toFixed(0)+ "°C";
    }
    return temperature;
  };


  return (
    <div className="App flex flex-col p-4 gap-y-2 ">
      <Search
        apiUrl={apiUrl}
        city={city}
        inputHandler={inputHandler}
        submitHandler={submitHandler}
        toggleDegree={toggleDegree}
        state={state}
        // input and submit hjandler
        setCity={setCity}
        setGetCity={setGetCity}
      />

      <>
        {apiData ? (
          <body className="Weather flex flex-col gap-y-2">
            <Daily
              apiData={apiData}
              apiUrl={apiUrl}
              city={city}
              state={state}
              initialState={initialState}
              temp={temp}
              setTemp={setTemp}
              // conversion test
              kelvinToFahrenheit={kelvinToFahrenheit}
              kelvinToCelsius={kelvinToCelsius}
              convertTemperature={convertTemperature}
              //
              // current={current}
            />

            <Hourly
              apiData={apiData}
              apiUrl={apiUrl}
              temp={temp}
              setTemp={setTemp}
              state={state}
              convertTemperature={convertTemperature}
              //
              // hourly={hourly}
            />
            <Week apiData={apiData} apiUrl={apiUrl} state={state}    convertTemperature={convertTemperature}/>
          </body>
        ) : (
          <h1 className="text-center">Loading </h1>
        )}
      </>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
