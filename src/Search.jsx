import PropTypes from "prop-types";


export default function Search(props) {
  const { inputHandler, setCity, submitHandler, toggleDegree, state } = props;


  return (
    <div className="flex flex-row justify-around  bg-white forecast-border">
      <div className=" flex flex-row  grow gap-x-2 ">
        {/* search */}
        <button className="" onClick={submitHandler}>
          <label htmlFor="location-name" className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              className="w-6"
              viewBox="0 0 50 50"
            >
              <path d="M 21 4 C 11.082241 4 3 12.082241 3 22 C 3 31.917759 11.082241 40 21 40 C 24.62177 40 27.99231 38.91393 30.820312 37.0625 L 43.378906 49.621094 L 47.621094 45.378906 L 35.224609 32.982422 C 37.581469 29.938384 39 26.13473 39 22 C 39 12.082241 30.917759 4 21 4 z M 21 8 C 28.756241 8 35 14.243759 35 22 C 35 29.756241 28.756241 36 21 36 C 13.243759 36 7 29.756241 7 22 C 7 14.243759 13.243759 8 21 8 z"></path>
            </svg>
          </label>
        </button>
{/* city input */}
        <input
          type="text"
          id="location-name"
          className="capitalize ps-2 grow"
          onChange={inputHandler}
          value={setCity}
        />
      </div>
{/* F/C toggle */}


      <button className="text-red-600   w-min current-weather-data px-2 font-bold" onClick={toggleDegree}>°{state.testDegree}</button>
          <div>
     
    </div>
      
    </div>
  );
}

Search.propTypes = {
  city: PropTypes.string.isRequired,
  inputHandler: PropTypes.func.isRequired,
  setCity: PropTypes.string.isRequired,

  state: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
  
  toggleDegree: PropTypes.func.isRequired,
  
};
