import React, { useEffect, useRef, useState } from 'react'
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn'

const Section3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Disconnect the observer once triggered
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    if (isVisible&& (totalProjects <= 15)) {
      setTimeout(() => {
        setTotalProjects(totalProjects + 1)
      }, 100);
    }

  }, [totalProjects,isVisible])
  return (
    <div className='my-[5rem] lg:my-[1rem]'>
      <div ref={ref} className='container flex flex-col lg:flex-row'>

        <div className={`lg:w-1/2  relative  hidden md:flex justify-center ${ isVisible? 'slide-in-left' : 'opacity-0'}`}>
          <div className='w-[170px] h-[70px] flex-center p-4 z-[5] left-[2rem] top-[4rem] absolute bg-[var(--reverse-color)] rounded-md'>
            <div className=' text-[50px] font-bold text-[green]  ml-1 '>2 </div>
            <div className=' text-[20px] font-normal leading-5 ml-2 text-[var(--app-background)]   '>
              Years of Expirences
            </div>

          </div>

          <div className='w-[200px] h-[70px]  flex-center p-4 z-[5] bottom-[5rem] right-[3rem] absolute  bg-[var(--reverse-color)] rounded-md'>

            <div className=' text-[50px] font-bold text-[orange]  ml-1 '>{totalProjects} </div>
            <div className=' text-[20px]  font-normal  leading-5 ml-3 text-[var(--app-background)]  '>
              Total Projects
            </div>

          </div>

          <img src="/images/satyam1.png" alt="" className='w-[550px] h-[380px] fit flip-horz lg:mr-[0px] ' />
        </div>
        <div className={`lg:w-1/2 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
          <div className='text-center md:text-start mb-[4rem] px-4'>
            <div className='color-orange text-[20px] font-bold mb-2'>
              I'm a Full Stack Web-Developer
            </div>
            <div className='text-[2.5rem] mb-3 font-bold'>
              I Can Design & Develope Anything You Want            </div>
            <p className='w-full    text-gray-400'>
              Hello there! I'm a web developer, and I'm very passionate and dedicated to my work. With 2 years experience as a professional web developer, I have acquired the skills and knowledge necessary to make your project a success. I enjoy every step of the design process, from discussion and collaboration.

            </p>
            <SimpleBtn fill={true} className={`mt-4 ${isVisible && 'slide-in'}`}>Hire Me</SimpleBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section3