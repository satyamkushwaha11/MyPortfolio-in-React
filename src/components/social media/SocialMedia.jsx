import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa6";

const SocialMedia = ({ size,className }) => {
    return (
        <ul className={`flex gap-4 flex-wrap ${className}`}>
            <li className='flex flex-col cursor-pointer	 items-center'>
                <FaGithub size={size || 30} />
                {/* <span className='text-xs'>Github</span> */}
            </li>
            <li className='flex flex-col cursor-pointer	 items-center'>
                <FaLinkedin size={size || 30} />
                {/* <span className='text-xs'>Linkedin</span> */}
            </li>
            <li className='flex flex-col cursor-pointer	 items-center'>
                <FaInstagram size={size || 30} />
                {/* <span className='text-xs'>Instagram</span> */}
            </li>
            <li className='flex flex-col cursor-pointer	 items-center'>
                <FaFacebook size={size || 30} />
                {/* <span className='text-xs'>Facebook</span> */}
            </li>
        </ul>

    )
}

export default SocialMedia
