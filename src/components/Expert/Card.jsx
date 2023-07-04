import React from 'react'
import Image from 'next/image'

const Card = ({url,specialist}) => {
  return (
    <div className='mb-10 '>
        <Image src={url} width={100} height={100} className='w-[150px] h-[180px] rounded-t-md  object-cover' alt={specialist}/>
        <button className='px-4 w-full bg-[#1A3578] py-2 rounded-b-md text-white'>{specialist}</button>
    </div>
  )
}

export default Card