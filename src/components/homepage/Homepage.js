import React, { useContext } from "react";
import { storeContext } from "../../context/Context";
import { lightTheme, darkTheme } from "../../context/style";
import nightmod from "../../assets/night-mode.png";
import daymod from "../../assets/day-mode (1).png";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TiWeatherCloudy } from "react-icons/ti";

function Homepage() {
  const {
    theme,
    location,
    setLocation,
    weatherData,
    forcast,
    sevenDays,
    loading,
    ShimmerEffect,
  } = useContext(storeContext);

  // Apply the selected theme
  const appliedTheme = theme === "light" ? lightTheme : darkTheme;

  // Extract temperature from weatherData (in Kelvin)
  const tempInKelvin = weatherData?.main?.temp;
  const tempfell = weatherData?.main?.feels_like;

  // Function to convert Kelvin to Celsius
  function kelvinToCelsius(temp) {
    return temp - 273.15;
  }

  function kelvnfeelsToCelsius(feels_like) {
    return feels_like - 273.15;
  }
  // Convert temperature to Celsius (only if temperature exists)
  const temperatureInCelsius = tempInKelvin
    ? kelvinToCelsius(tempInKelvin)
    : null;
  const feelsCelsius = tempfell ? kelvnfeelsToCelsius(tempfell) : null;

  // wind spped

  function convertToKmH(speedInMetersPerSecond) {
    return (speedInMetersPerSecond * 3.6).toFixed(2); // Convert and round to 2 decimal places
  }

  // Example usage:
  const windSpeedInMetersPerSecond = weatherData?.wind?.speed;
  const wind = convertToKmH(windSpeedInMetersPerSecond);
  // console.log(`${wind} km/h`);

  const currentHour = new Date().getHours();

  const displayedImage =
    currentHour >= 18 || currentHour < 6 ? nightmod : daymod;

  return (
    <div style={appliedTheme} className="h-[90vh] flex w-full p-4 ">
      {/* Left section */}
      <div className="flex w-[50%]  h-full flex-col">
        {/* first section */}
        <div className="flex justify-center items-center">
          <input
            className="p-2 w-[30vw] bg-slate-200 text-gray-600 rounded-xl"
            type="text"
            value={location}
            placeholder="Enter city name..."
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* second section  */}
        <div className="flex justify-between p-2 h-40">
          <div className="flex justify-between p-6 w-full">
            <div className="flex flex-col justify-between">
              <div className="text-3xl">
                <h1>{weatherData?.name}</h1>
              </div>
              <div className="text-3xl">
                {temperatureInCelsius !== null ? (
                  <span>{temperatureInCelsius.toFixed(0)}°C</span>
                ) : (
                  <span>No temp data available</span>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img src={displayedImage} className="h-[130px]" alt="" />
            </div>
          </div>
        </div>
        {/* third section */}
        <div className="flex p-2 h-48 w-full">
          <div className="flex flex-col h-full w-full justify-between">
            <div className="">
              <h1 className="font-bold">Today Forecast</h1>
            </div>
            <div className="flex justify-around items-center">
              {forcast &&
                forcast.slice(0, 6).map((item) => {
                  // Extract time part from dt_txt
                  const timePart = item.dt_txt.split(" ")[1]; // "09:00:00"
                  const hour = parseInt(timePart.split(":")[0], 10); // Extract hour

                  return (
                    <div
                      key={item.dt}
                      className="flex flex-col items-center justify-center"
                    >
                      <div>
                        <span>{hour}:00</span> {/* Display hour */}
                      </div>
                      <div className="">
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                          className="h-[75px]"
                        />
                      </div>
                      <div>
                        <span>
                          {kelvinToCelsius(item.main.temp).toFixed(0)}°C
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Forth section */}

        <div className="h-[12.5rem] w-full ">
          <div className="flex flex-col h-full w-full p-2">
            <div className="h-[20%]">
              <h1 className="font-bold">AIR CONDITIONS</h1>
            </div>
            <div className="flex h-[80%] w-full gap-2">
              <div className="flex flex-col gap-2 h-full w-1/2 ">
                <div className=" flex flex-col h-1/2 w-full">
                  <div className="flex gap-4">
                    <span>
                      <FaTemperatureQuarter size={24} />
                    </span>
                    <span>
                      <p className="text-xl font-bold">Real Feel</p>
                    </span>
                  </div>
                  <div className="ml-8">
                    <span className="text-2xl font-bold">
                      {feelsCelsius !== null ? (
                        <span>{feelsCelsius.toFixed(0)}°C</span>
                      ) : (
                        <span>0°C</span>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4">
                    <span>
                      <TiWeatherCloudy size={24} />
                    </span>
                    <span>
                      <p className="text-xl font-bold">Weather Phenomena</p>
                    </span>
                  </div>
                  <div className="ml-8">
                    <span className="text-2xl font-bold">
                      {weatherData?.weather[0]?.main ? (
                        <span>{weatherData.weather[0].main}</span>
                      ) : (
                        <span>Haze</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* second section  */}
              <div className="flex flex-col gap-2 h-full w-1/2 ">
                <div className=" flex flex-col h-1/2 w-full">
                  <div className="flex gap-4">
                    <span>
                      <FaWind size={24} />
                    </span>
                    <span>
                      <p className="text-xl font-bold">Wind</p>
                    </span>
                  </div>
                  <div className="ml-8">
                    <span className="text-2xl font-bold">
                      {wind > 0 ? (
                        <span>{`${wind} km/h`}</span>
                      ) : (
                        <span>0 km/h</span>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4">
                    <span>
                      <WiHumidity size={24} />
                    </span>
                    <span>
                      <p className="text-xl font-bold">Humidity</p>
                    </span>
                  </div>
                  <div className="ml-8">
                    <span className="text-2xl font-bold">
                      {weatherData?.main?.humidity > 0 ? (
                        <span>{`${weatherData?.main?.humidity} %`}</span>
                      ) : (
                        <span>0 %</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex w-[50%] justify-center items-center">
        <div className="w-[80%] h-full p-2 flex flex-col justify-evenly ">
          <div>
            <span className="text-xl underline">7-Day's Forecast</span>
          </div>
          <div className="flex flex-col justify-evenly w-full">
            {loading ? (
              <ShimmerEffect />
            ) : (
              sevenDays &&
              sevenDays.map((items, id) => {
                const datess = items?.datetime;
                const date = new Date(datess);
                const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date); // day formate
                const imgs = items?.weather?.icon;
                const iconUrl = `https://www.weatherbit.io/static/img/icons/${imgs}.png`;
                const pop = items?.pop;

                return (
                  <div
                    key={id}
                    className="flex items-center justify-evenly w-full gap-4"
                  >
                    <div className="w-[20%]">{datess}</div>
                    <div className="flex gap-2 justify-center items-center w-[60%]">
                      <img className="h-[70px]" src={iconUrl} alt="" />
                      <span className="text-[12px] font-bold">
                        {items?.weather?.description}
                      </span>
                    </div>
                    <div className="w-[20%] flex gap-2">
                      <span>
                        <IoWaterOutline />
                      </span>
                      <span>{pop}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
