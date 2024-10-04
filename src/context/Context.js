import React, { createContext, useEffect, useState } from 'react';


export const storeContext = createContext(null);

const Apikey = 'e6d9f3cac0593e8f8de4da7112ed38ef';
const Apikey2 = '746a6f8971d24f018fff1b57ef5b6713';
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/';
const Api_endPoint2 = 'https://api.weatherbit.io/v2.0/'
// 

function Context({ children }) {
    const [theme, setTheme] = useState('light');
    const [location, setLocation] = useState('patna');
    const [weatherData, setWeatherData] = useState(null);
    const [forcast, setForcast] = useState(null);
    const [sevenDays, setSevenDays] = useState(null);
    const [loading , setLoading] = useState(true);

    // const token = process.env.Apikey;
    // const token2 = process.env.Apikey2;

    const darkHandeler = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const Apifeatch = async (location) => {
        const url = `${API_ENDPOINT}weather?q=${location}&appid=${Apikey}`;
        const url2 = `${API_ENDPOINT}forecast?q=${location}&appid=${Apikey}`;

        try {
            const response = await fetch(url);
            const response2 = await fetch(url2);
            if (!response.ok || !response2.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            const data2 = await response2.json();
            console.log(data, 'weather data');
            console.log(data2.list, 'forecast data');
            
            setWeatherData(data); // Store weather data in state
            setForcast(data2.list); // Store forecast data in state

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // const latt = weatherData?.coord;
    // console.log(latt,'llll');

    const Apifeatch2 = async()=>{
        // if (!weatherData) return; // exit if weatherData is null or undefined
        const lated = weatherData?.coord;
        const url3 = `${Api_endPoint2}forecast/daily?lat=${lated?.lat}&lon=${lated?.lon}&days=7&key=${Apikey2}`;
        try {
            const res = await fetch(url3);
            if(!res.ok){
                throw new Error('Failed to fetch weather data');
            }
            const data3 = await res.json();
            console.log(data3,'data333');
            setSevenDays(data3.data); // Store 7-day forecast data in state
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        finally {
            setLoading(false);
          }
    };


    function ShimmerEffect() {
        return (
          <div className="flex h-[80vh] flex-col justify-evenly w-full">
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div key={index} className="flex items-center justify-evenly w-full gap-4">
                <div className="w-[20%] bg-gray-200 h-4 rounded animate-pulse"></div>
                <div className="flex gap-2 justify-center items-center w-[60%]">
                  <div className="bg-gray-200 h-10 w-10 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-20 rounded animate-pulse"></div>
                </div>
                <div className="w-[20%] flex gap-2">
                  <div className="bg-gray-200 h-4 w-4 rounded animate-pulse"></div>
                  <div className="bg-gray-200 h-4 w-10 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        );
      }

    
    useEffect(() => {
        Apifeatch(location); // Fetch weather data when component mounts or location changes
    }, [location]);

    useEffect(()=>{
        Apifeatch2();
    },[weatherData])


    return (
        <storeContext.Provider value={{ theme, darkHandeler, location, setLocation, weatherData, forcast , sevenDays, ShimmerEffect,loading}}>
            {children}
        </storeContext.Provider>
    );
}

export default Context;
