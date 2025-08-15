import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TitleCards from '../components/TitleCards'
import { IoPlayOutline } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { Link, useNavigate } from 'react-router';
import { BASE_URL, IMAGE_BASE_URL, options } from '../envimport/baseUrl'

function Home() {

    const navigate = useNavigate();

    const [apiData, setApiData] = useState([]);

    const handlePlay = () => {
        navigate(`/movie/${apiData.id}`);
    }


    useEffect(() => {
        fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                const randomIndex = Math.round(Math.random() * res.results.length)
                setApiData(res.results[randomIndex])
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div className='home'>
            <Navbar />

            <div className="hero relative">

                <Link to={`/movie/${apiData.id}`}>
                    <img
                        src={`${IMAGE_BASE_URL}` + apiData.backdrop_path}
                        alt="hero_banner"
                        className='w-full banner-img'
                    />
                </Link>

                <div className="hero-caption absolute bottom-0 w-full pl-[4%] lg:pl-[6%]">
                    <h1 className='text-xl md:text-4xl font-bold mb-2.5 lg:mb-7.5'>{apiData.original_title}</h1>

                    <p className='max-w-[700px] mb-2.5 lg:mb-5 text-xs md:text-sm'>{apiData.overview}</p>

                    <div className="hero-btns flex gap-2.5 mb-1 lg:mb-12">
                        <button
                            type='button'
                            onClick={handlePlay}
                            className='border-0 outline-0 py-1 px-2.5 md:py-2 md:px-5 inline-flex items-center gap-1.5 font-semibold bg-[#e50914] rounded cursor-pointer text-white text-[12px] md:text-[16px] hover:bg-[#be050e]'>
                            <IoPlayOutline className='size-5 md:size-7' />
                            Watch Now
                        </button>

                        <button
                            type="button"
                            className='border-0 outline-0 py-1 px-2.5 md:py-2 md:px-5 inline-flex items-center gap-2.5 font-semibold bg-[#6d6d6eb3] rounded cursor-pointer text-white text-[12px] md:text-[16px] hover:bg-[#6d6d6e66]'>
                            <GoInfo className='size-4 md:size-6' />
                            More Info
                        </button>
                    </div>

                    <div className='hidden lg:block'>
                        <TitleCards />
                    </div>

                </div>
            </div>

            <div className="more-cards pl-[4%] lg:pl-[6%]">
                <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
                <TitleCards title={"Only on Netflix"} category={"popular"} />
                <TitleCards title={"Upcoming"} category={"upcoming"} />
                <TitleCards title={"Top Pics for You"} category={"now_playing"} />
            </div>

        </div>
    )
}

export default Home
