import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { auth } from '../firebase';

function Footer() {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLogin(true);
            }
            else {
                setIsLogin(false);
            }
        });
    }, []);


    return isLogin ?
        (
            <div className='footer py-7 px-[4%] max-w-[1000px] mx-auto'>
                <div className="flex gap-5 my-10">
                    <img src={assets.facebook_icon} alt="facebook_icon" className='w-6 md:w-7 cursor-pointer' />
                    <img src={assets.instagram_icon} alt="instagram_icon" className='w-6 md:w-7 cursor-pointer' />
                    <img src={assets.youtube_icon} alt="youtube_icon" className='w-6 md:w-7 cursor-pointer' />
                    <img src={assets.twitter_icon} alt="twitter_icon" className='w-6 md:w-7 cursor-pointer' />
                </div>

                <ul className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-7 text-sm md:text-[16px] text-[#aeaeae] list-none'>
                    <li>Audio Description</li>
                    <li>Help Center</li>
                    <li>Gift Cards</li>
                    <li>Media Center</li>
                    <li>Investor Relations</li>
                    <li>Jobs</li>
                    <li>Terms of Use</li>
                    <li>Privacy</li>
                    <li>Legal Notices</li>
                    <li>Cookie Preferences</li>
                    <li>Corporate Information</li>
                    <li>Contact Us</li>
                </ul>

                <p className="text-[#808080] text-sm text-center">© 1997-2025 Netflix, Inc.</p>

            </div>
        )
        :
        (
            <div className='footer py-8 md:py-14 px-6 md:px-[6%] lg:px-[11%] mx-auto bg-[#222222a8] text-[#aeaeae]'>
                <p className='pb-6'>Questions? Call 000-888-919-1743 (Toll-Free)</p>

                <ul className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-7 text-sm list-none'>
                    <li>FAQ</li>
                    <li>Help Center</li>
                    <li>Terms of Use</li>
                    <li>Privacy</li>
                    <li>Cookie Preferences</li>
                    <li>Corporate Informaions</li>
                </ul>

                <div className="relative inline-block">
                    <select className='border border-[#646464] outline-none py-1 pl-4 pr-9 font-semibold rounded appearance-none cursor-pointer'>
                        <option value="English" className='text-black font-medium'>English</option>
                        <option value="हिन्दी " className='text-black font-medium'>हिन्दी </option>
                    </select>

                    <img
                        src={assets.caret_icon}
                        alt=""
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none size-3"
                    />
                </div>
            </div>
        )
}

export default Footer
