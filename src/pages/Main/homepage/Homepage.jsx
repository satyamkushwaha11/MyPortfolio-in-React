import React from 'react'
import './homepage.css'
import SimpleBtn from '../../../components/buttons/SimpleBtn/SimpleBtn'
import UpdownIcon from '../../../components/logo/UpdownIcon/UpdownIcon'

const Homepage = () => {
    return (
        <div className='homepage-container'>
            <div className='section_1 '>
                <div className='section_1_background_img'>
                </div>
                <div className="w-full h-full container">
                    <div className='section1_content'>
                        <div className='my-info px-5 pb-5 text-center lg:text-left lg:w-1/2  text-[var(--reverse-color)]'>
                            <div className='text-[2rem] font-semibold text-[var(--orange)]'>
                                Hello, I'm
                            </div>
                            <h3 className='text-[3rem] lg:text-[4rem] font-bold leading-[3.3rem]  mt-5 mb-[2rem]'>
                                Satyam Kushwaha
                            </h3>
                            <div className='text-[1.5rem] mt-3 mb-5 '>
                                A <span className='text-[#1cbe59]'>   Full Stack Web Developer  </span>  From<span className='text-[var(--orange)]'>  India</span>.
                            </div>
                            <p className='text-[1.3rem] mt-4 mb-5'>
                                I'm a talented full-stack web developer from India, merging creative design with powerful functionality. Passionate about crafting seamless user experiences and building robust digital solutions.                            </p>
                            <div className='flex gap-4 items-center'>
                                <SimpleBtn>About Me</SimpleBtn>
                                <ul>
                                    social media
                                </ul>
                            </div>
                        </div>
                        <div className='my-img-container  lg:w-1/2 flex justify-end'>
                            {/* <div className='absolute top-0'>
                                <UpdownIcon imageUrl={'/images/satyam.png'}/>
                            </div> */}
                            <img src="/images/satyam1.png" alt="" className='mt-[100px] lg:mt-[150px] lg:mr-[0px] w-[700px]' />
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage