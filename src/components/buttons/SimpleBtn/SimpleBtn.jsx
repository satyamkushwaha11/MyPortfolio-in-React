import React from 'react'
import './simpleBtn.css'
const SimpleBtn = ({children}) => {
  return (
    <button className='simple_btn'>{children}</button>
  )
}

export default SimpleBtn