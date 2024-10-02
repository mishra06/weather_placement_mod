import React, { useContext } from 'react';
import { storeContext } from '../../context/Context';
import { lightTheme, darkTheme } from '../../context/style';
import fog from "../../assets/fog.png";
import nightmod from "../../assets/night-mode.png";
import daymod from "../../assets/fog.png";

function Homepage() {
  const { theme, location, setLocation, weatherData,forcast } = useContext(storeContext);

  // Apply the selected theme
  const appliedTheme = theme === 'light' ? lightTheme : darkTheme;

  // Extract temperature from weatherData (in Kelvin)
  const tempInKelvin = weatherData?.main?.temp;

  // Function to convert Kelvin to Celsius
  function kelvinToCelsius(temp) {
    return temp - 273.15;
  }

  // Convert temperature to Celsius (only if temperature exists)
  const temperatureInCelsius = tempInKelvin ? kelvinToCelsius(tempInKelvin) : null;

  const currentHour = new Date().getHours();

  const displayedImage =
    currentHour >= 18 || currentHour < 6 ? nightmod : daymod;


  return (
    <div style={appliedTheme} className='h-[90vh] flex w-full p-4 '>
      {/* Left section */}
      <div className='flex w-[50%] border-indigo-300 border-2 h-full flex-col'>
        {/* first section */}
        <div>
          <input
            className='p-2 w-[40vw] bg-slate-200 text-gray-600 rounded-xl'
            type="text"
            value={location}
            placeholder='Enter city name...'
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* second section  */}
        <div className='flex justify-between p-2 h-40'>
          <div className='flex justify-between p-6 w-full'>
            <div className='flex flex-col justify-between'>
              <div className='text-3xl'>
                <h1>{weatherData?.name}</h1>
              </div>
              <div className='text-3xl'>
                {temperatureInCelsius !== null ? (
                  <span>{temperatureInCelsius.toFixed(0)}°C</span>
                ) : (
                  <span>No temp data available</span>
                )}
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <img src={displayedImage} className="h-[130px]" alt="" />
            </div>
          </div>
        </div>
        {/* third section */}
        <div className='flex p-2 h-40 w-full border-2 border-red-300'>
                
        </div>
      </div>

      {/* Right section */}
      <div className='flex w-[50%]'></div>
    </div>
  );
}

export default Homepage;
