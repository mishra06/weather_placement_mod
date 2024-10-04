import React, { useContext } from 'react';
import { storeContext } from '../../context/Context'; // Import storeContext
import { IoMoonOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import imgss from "../../assets/770b805d5c99c7931366c2e84e88f251.png";

function Navbar() {
    const { theme, darkHandeler } = useContext(storeContext); // Use storeContext here

    return (
        <div className='flex justify-around bg-[#eef8ed] items-center h-[7vh]'>
            <div>
                <span className='text-green-800 text-xl font-bold'><img className='h-[7vh]' src={imgss} alt="" /></span>
            </div>
            <div className='flex gap-2 '>
                  <button className='bg-[#eef8ed]' onClick={darkHandeler}>{theme === 'light' ? <LuSunMoon size={24} /> :<IoMoonOutline size={24} />}</button>
            </div>
        </div>
    );
}

export default Navbar;
