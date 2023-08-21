import React from 'react'
import './index.css'
import {GrTechnology} from 'react-icons/gr'

const LOGO = () => {
  return (
    <div  className='flex items-center px-2  border-3'>
        {/* <GrTechnology className='logo-icon'/> */}
        <span className='icon-text icon-text1'>Satyam</span>
        <span className='icon-text icon-text2'>Kushwaha</span>
    </div>
  )
}

export default LOGO