import React from 'react';
import './aboutUs.css';

const AboutUs = () => {
    return (
        <div className='about-us-container '>
            <div className='container'>

                <div className='text-center mb-5 px-4'>
                    <div className='color-orange text-[20px] font-bold mb-2'>
                        Contact Me
                    </div>
                    <div className='text-[2.5rem] mb-3 font-bold'>
                        I Want To Hear From You
                    </div>
                    <p className='w-full  lg:w-2/4 mx-auto text-gray-400'>
                        Please fill out the form on this section to contact with me. Or call between 9:00 a.m. and 8:00 p.m. ET, Monday through Friday
                    </p>
                </div>

                <div className='flex'>
                    <div className='w-1/2'>
                        social media
                    </div>
                    <div className='w-1/2'>
                        form
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs