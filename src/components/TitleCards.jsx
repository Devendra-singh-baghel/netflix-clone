import React, { useEffect, useRef, useState } from 'react'
import cards_data from '../assets/cards/Cards_data'
import { BASE_URL, IMAGE_BASE_URL, options } from '../envimport/baseUrl';
import { Link } from 'react-router';

function TitleCards({ title, category }) {

    const [apiData, setApiData] = useState([]);

    const cardsRef = useRef();


    useEffect(() => {
        fetch(`${BASE_URL}/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));
    })


    // Mouse wheel scrollable card
    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])

    return (
        <div className='mt-5 mb-0 md:mt-12 md:mb-7'>
            <h2 className='mb-2'>{title ? title : "Popular on Netflix"}</h2>
            <div
                ref={cardsRef}
                className="card-list flex gap-2.5 overflow-x-scroll"
            >
                {
                    apiData.map((card, index) => (
                        <Link to={`/movie/${card.id}`} key={index} className='card relative shrink-0'>
                            <img
                                src={`${IMAGE_BASE_URL}` + card.backdrop_path}
                                alt="image"
                                className='w-[165px] md:w-[240px] rounded cursor-pointer'
                            />
                            <p className='absolute bottom-2.5 right-2.5 text-white text-xs'>{card.original_title}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default TitleCards
