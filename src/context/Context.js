import React, { createContext, useEffect, useState } from 'react';

export const storeContext = createContext(null);

const Apikey = 'e6d9f3cac0593e8f8de4da7112ed38ef';
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/';

function Context({ children }) {
    const [theme, setTheme] = useState('light');
    const [location, setLocation] = useState('patna');
    const [weatherData, setWeatherData] = useState(null);
    const [forcast, setForcast] = useState(null);
    // const [rain, setRain] = useState(null);

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

    // const latttt = weatherData?.coord;
    // console.log(latttt,'llll');

    // const fetchRain = async () => {
    //     const url3 = `https://api.openweathermap.org/data/2.5/weather?lat=25.6&lon=85.1167&appid=${Apikey}`;
    //     try {
    //       const res = await fetch(url3);
    //       if (!res.ok) {
    //         throw new Error('Failed to fetch rain data');
    //       }
    //       const data3 = await res.json();
    //       console.log(data3, "dataaaaa3");
    //       const rainChance = data3.daily[0].pop * 100; // Extract rain chance percentage from daily forecast
    //       setRain(rainChance); // Store rain chance percentage in state
    //     } catch (error) {
    //       console.error('Error fetching rain data:', error);
    //     }
    //   };
    useEffect(() => {
        Apifeatch(location); // Fetch weather data when component mounts or location changes
    }, [location]);

    // useEffect(()=>{
    //     fetchRain();
    // },[weatherData]);

    return (
        <storeContext.Provider value={{ theme, darkHandeler, location, setLocation, weatherData, forcast}}>
            {children}
        </storeContext.Provider>
    );
}

export default Context;
