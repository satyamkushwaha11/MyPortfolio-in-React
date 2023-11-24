import React from 'react'
import './footer.css'
import { PiCopyrightBold } from 'react-icons/pi'
import SocialMedia from '../social media/SocialMedia'
import { contactDetails } from '../../config/constants'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-content-wrapper container'>
                <div className='footer-content'>
                    <h2>About Me</h2>
                    <ul>
                        <li>
                            <p className='text-[14px]'>
                                I'm a talented full-stack web developer from India, merging creative design with powerful functionality.
                            </p>
                        </li>

                        <SocialMedia size={18} className='mt-3' />
                    </ul>
                </div>

                <div className='footer-content'>
                    <h2>Contact Me</h2>
                    <ul className='flex flex-col gap-2 '>
                        <li>Noida,India</li>
                        <li>+91-9625110686</li>
                        <li className='wrap-break'>satyamkushwaha1101@gmail.com</li>


                    </ul>
                </div>
                <div className='footer-content'>
                    <h2>Quick Links</h2>
                    <ul className='flex flex-col gap-2 footer-ul'>
                        <li>Home</li>
                        <li>About Me</li>
                        <li>Resume</li>
                        <li>Projects</li>
                        <li>Skill</li>
                        <li>Blogs</li>
                    </ul>
                </div>
                <div className='footer-content'>
                    <h2 className='flex  items-start gap-1 lg:items-center justify-start leading-6	'> <PiCopyrightBold /> Satyam Kushwaha</h2>
                    <ul>
                        <li>MADE WITH ❤️ BY
                            <div>
                                <i>Satyam Kushwaha</i>.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer