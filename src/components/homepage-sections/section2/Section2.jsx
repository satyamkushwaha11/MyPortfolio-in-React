import React from 'react';
import './section2.css';
const aboutData = [
  { heading: 'Pixel Perfect', desc: 'Most common methods for designing websites that work well on desktop is responsive and adaptive design.' },
  { heading: 'High Quality', desc: 'Most common methods for designing websites that work well on desktop is responsive and adaptive design.' },
  { heading: 'Awesome Idea', desc: 'Most common methods for designing websites that work well on desktop is responsive and adaptive design' },

]

const Section2 = () => {
  return (
    <div className=' section2_content min-h-[10vh] border-0 py-[6rem] lg:py-[8rem]'>
      <div className='container flex  flex-col gap-4 lg:gap-0 lg:flex-row justify-between'>
        {/* <h3></h3> */}

        {aboutData.map((item, index) => (
          <div key={index} className=' w-5/6 mx-auto lg:w-1/4 text-center' >
            <h3 className='text-[30px] font-medium  mb-0 lg:mb-3 color-orange '>
              {item?.heading}
            </h3>
            <p className='border-0 py-2 rounded-md text-[1rem]  '>
              {item?.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section2