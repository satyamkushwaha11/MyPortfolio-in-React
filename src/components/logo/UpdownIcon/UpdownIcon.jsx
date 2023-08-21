import React from 'react'

const UpdownIcon = ({imageUrl}) => {
  return (
    <div className='p-3 border-2 bg-white  w-[50px] h-[50px] rounded-full'>
        <img src={imageUrl||''} alt="No " className='w-[100%]'/>
    </div>
  )
}

export default UpdownIcon