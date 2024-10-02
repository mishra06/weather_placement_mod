import React, { useContext } from 'react';
import { storeContext } from '../../context/Context'; // Import storeContext
import { IoMoonOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";

function Navbar() {
    const { theme, darkHandeler } = useContext(storeContext); // Use storeContext here

    return (
        <div className='flex justify-evenly h-[10vh] bg-slate-300 items-center'>
            <div>
                <span className='text-green-800 text-xl font-bold'>WEATHER APP</span>
            </div>
            <div className='flex gap-2 bg-slate-200'>
                  <button className='bg-slate-300' onClick={darkHandeler}>{theme === 'light' ? <LuSunMoon size={24} /> :<IoMoonOutline size={24} />}</button>
            </div>
        </div>
    );
}

export default Navbar;
