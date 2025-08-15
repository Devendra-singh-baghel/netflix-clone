import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import { Link, useNavigate, useParams } from 'react-router';
import { BASE_URL, IMAGE_BASE_URL, options } from '../envimport/baseUrl';
import { IoPlayOutline } from "react-icons/io5";


function Movie() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState([]);
    const [recommendations, setRecommendations] = useState([]);


    useEffect(() => {
        fetch(`${BASE_URL}/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setMovie(res))
            .catch(err => console.error(err));
    }, [id])


    useEffect(() => {
        fetch(`${BASE_URL}/movie/${id}/recommendations?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setRecommendations(res.results || []))
            .catch(err => console.error(err));
    }, [id])


    const handlePlay = () => {
        navigate(`/movie/player/${movie.id}`);
    }


    return (
        <div className='min-h-screen text-white'>
            <div className={`relative h-[60vh] flex items-end`}
                style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >

                <div className='absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent'>

                    <div className='relative z-10 flex items-end p-8 gap-8 h-full'>
                        <img
                            src={`${IMAGE_BASE_URL}` + movie.poster_path}
                            alt=""
                            className='rounded-lg shadow-lg w-48 hidden md:block'
                        />

                        <div>
                            <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
                            <div className='flex items-center gap-4 mb-2'>
                                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                                <span>{movie.release_date}</span>
                                <span>{movie.runtime} min</span>
                            </div>

                            <div className='flex flex-wrap gap-2 mb-4'>
                                {
                                    movie.genres?.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className='bg-gray-800 px-3 py-1 rounded-full text-sm'
                                        >
                                            {genre.name}
                                        </span>
                                    ))
                                }
                            </div>

                            <p className='max-w-2xl text-gray-200 text-xs'>{movie.overview}</p>

                            <button
                                type='button'
                                onClick={handlePlay}
                                className='border-0 outline-0 py-1 px-2.5 md:py-3 md:px-4 mt-3 md:mt-4 inline-flex items-center gap-1.5 font-semibold bg-[#e50914] rounded-full cursor-pointer text-white text-[10px] md:text-[16px] hover:bg-[#d70610]'>

                                <IoPlayOutline size={20} />
                                Watch Now
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            <div className='p-8'>
                <h2 className='text-2xl font-semibold mb-4'>Details</h2>
                <div className='bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8'>
                    <div className='flex-1'>
                        <ul className='text-gray-300 space-y-3'>
                            <li>
                                <span className='font-semibold text-white'>Status: </span>
                                <span className='ml-2'>{movie.status}</span>
                            </li>

                            <li>
                                <span className='font-semibold text-white'>Release Date: </span>
                                <span className='ml-2'>{movie.release_date}</span>
                            </li>

                            <li>
                                <span className='font-semibold text-white'>Original Language: </span>
                                <span className='ml-2'>{movie.original_language?.toUpperCase()}</span>
                            </li>

                            <li>
                                <span className='font-semibold text-white'>Budget: </span>
                                <span className='ml-2'>{movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}</span>
                            </li>

                            <li>
                                <span className='font-semibold text-white'>Revenue: </span>
                                <span className='ml-2'>{movie.budget ? `$${movie.revenue.toLocaleString()}` : "N/A"}</span>
                            </li>

                            <li>
                                <span className='font-semibold text-white'>Production Companies: </span>
                                <span className='ml-2'>
                                    {
                                        movie.production_companies &&
                                            movie.production_companies.length > 0 ?
                                            movie.production_companies.map((c) => c.name).join(", ")
                                            :
                                            "N/A"
                                    }
                                </span>
                            </li>

                            <li>
                                <span className='font-semibold text-white'>Production Countries: </span>
                                <span className='ml-2'>
                                    {
                                        movie.production_countries &&
                                            movie.production_countries.length > 0 ?
                                            movie.production_countries.map((c) => c.name).join(", ")
                                            :
                                            "N/A"
                                    }
                                </span>
                            </li>

                            <li>
                                <span className='font-semibold text-white'>Spoken Languages: </span>
                                <span className='ml-2'>
                                    {
                                        movie.spoken_languages &&
                                            movie.spoken_languages.length > 0 ?
                                            movie.spoken_languages.map((l) => l.name).join(", ")
                                            :
                                            "N/A"
                                    }
                                </span>
                            </li>
                        </ul>

                    </div>
                    <div className='flex-1'>
                        <h3 className='font-semibold text-white mb-2'>Tagline</h3>
                        <p className='italic text-gray-400 mb-6'>{movie.tagline || "No tagline available."}</p>

                        <h3 className='font-semibold text-white mb-2'>Overview</h3>
                        <p className='text-gray-200 mb-6'>{movie.overview || "No tagline available."}</p>

                    </div>
                </div>
            </div>

            {
                recommendations.length > 0 && (
                    <div className='p-8'>
                        <h2 className='text-2xl font-semibold mb-4'>You might also like...</h2>

                        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
                            {
                                recommendations.slice(0, 10).map((rec) => (
                                    <div key={rec.id}
                                        className='bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition-all'
                                    >
                                        <Link
                                            to={`/movie/${rec.id}`}
                                            className='card relative shrink-0'
                                        >
                                            <img
                                                src={`${IMAGE_BASE_URL}` + rec.poster_path}
                                                alt="image"
                                                className='w-full h-80 object-cover rounded cursor-pointer'
                                            />

                                            <div className='p-2'>
                                                <h3 className='text-sm font-semibold'>{rec.title}</h3>
                                                <span className='text-xs text-gray-400'>{rec.release_date?.slice(0, 4)}</span>
                                            </div>
                                        </Link>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            <img
                src={assets.back_arrow_icon}
                alt="back_arrow_icon"
                className='absolute top-5 left-5 w-[50px] z-50 cursor-pointer'
                onClick={() => navigate(-2)}
            />

        </div >
    )
}

export default Movie
