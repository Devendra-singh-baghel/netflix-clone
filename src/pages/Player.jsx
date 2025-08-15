import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate, useParams } from 'react-router';
import { BASE_URL, options } from '../envimport/baseUrl';

function Player() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: "",
    });


    useEffect(() => {
        fetch(`${BASE_URL}/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0]))
            .catch(err => console.error(err));
    })



    return (
        <div className='player h-screen flex flex-col justify-center items-center'>
            <img
                src={assets.back_arrow_icon}
                alt="back_arrow_icon"
                className='absolute top-5 left-5 w-[50px] cursor-pointer'
                onClick={() => navigate(-1.5)}
            />
            <iframe
                width="90%"
                height="90%"
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title="trailer"
                frameborder="0"
                allowFullScreen
                className='rounded-lg'
            ></iframe>

            <div className="flex items-center justify-between w-[90%]">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player
