import React from 'react'
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn'

const Section3 = () => {
  return (
    <div className='my-[5rem] lg:my-[1rem]'>
      <div className='container flex flex-col lg:flex-row'>

        <div className='lg:w-1/2 flex justify-center'>
          <img src="/images/satyam1.png" alt="" className='w-[550px] h-[380px] fit flip-horz lg:mr-[0px] ' />
        </div>
        <div className='lg:w-1/2'>
          <div className=' mb-[4rem] px-4'>
            <div className='color-orange text-[20px] font-bold mb-2'>
              I'm a Full Stack Web-Developer
            </div>
            <div className='text-[2.5rem] mb-3 font-bold'>
              I Can Design & Develope Anything You Want            </div>
            <p className='w-full    text-gray-400'>
              Hello there! I'm a web developer, and I'm very passionate and dedicated to my work. With 2 years experience as a professional web developer, I have acquired the skills and knowledge necessary to make your project a success. I enjoy every step of the design process, from discussion and collaboration.

            </p>
            <SimpleBtn fill={true} className='mt-4'>Hire Me</SimpleBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section3