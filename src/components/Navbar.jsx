import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import { logout } from '../firebase';

function Navbar() {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsDark(window.scrollY >= 88);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div
            className={`w-full py-5 px-[4%] lg:py-5 lg:px-[2%] flex justify-between fixed text-sm text-[#e5e5e5] z-10 transition-all duration-300 ${isDark
                ? "bg-[#141414] shadow-md shadow-black/40"
                : "bg-gradient-to-b from-[rgba(0,0,0,0.7)] from-10% to-transparent shadow-none"
                }`}
        >
            <div className='flex items-center gap-12'>
                <img src={assets.logo} alt="logo" className='w-[90px]' />

                <ul className='hidden lg:flex list-none gap-5 nav-link'>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>Anime</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li>Browse by Languages</li>
                </ul>
            </div>

            <div className='flex gap-5 items-center relative'>

                <div className='relative hidden md:inline-flex'>
                    <input
                        type="text"
                        placeholder='Search...'
                        className='bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none' />

                    <img
                        src={assets.search_icon}
                        alt="search_icon"
                        className='absolute right-4 top-2 cursor-pointer'
                    />
                </div>

                <button
                    type="button"
                    className='bg-[#e50914] px-5 py-2 text-white hidden md:block'
                >
                    Get AI Movie Picks
                </button>

                <button
                    type="button"
                    onClick={() => logout()}
                    className='border border-[#333333] py-2 px-4 cursor-pointer hover:bg-[#333333b1] duration-300 transition-all'
                >
                    Sign Out
                </button>

            </div>
        </div>
    )
}


export default Navbar
