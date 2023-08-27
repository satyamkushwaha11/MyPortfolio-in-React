import React from 'react'
import './simpleBtn.css'
const SimpleBtn = ({children,fill,className}) => {
  return (
    <button className={`${fill?"simple_btn_fill":'simple_btn'} ${className?className:''}`}>{children}</button>
  )
}

export default SimpleBtn