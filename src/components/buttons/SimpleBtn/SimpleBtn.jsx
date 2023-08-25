import React from 'react'
import './simpleBtn.css'
const SimpleBtn = ({children,fill}) => {
  return (
    <button className={fill?"simple_btn_fill":'simple_btn'}>{children}</button>
  )
}

export default SimpleBtn