import React from 'react'

const UpdownIcon = ({imageUrl,classNamee}) => {
  return (
    <div className={` border-2 bg-white absolute  w-[60px] h-[60px]  ${classNamee?classNamee:''}`}>
        <img src={imageUrl||''} alt="No " className='w-[100%]'/>
    </div>
  )
}

export default UpdownIcon