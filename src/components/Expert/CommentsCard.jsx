import Image from 'next/image'
import React from 'react'
import avatar from '../../../public/images/avatar.png'
import { AiFillEye,AiFillMessage ,AiFillCaretUp,AiFillCaretDown} from "react-icons/ai";

const CommentsCard = ({name,message,time}) => {

   
    var myDate = new Date(time.seconds*1000);
     var formatedTime=myDate.toJSON();
     
     let date= formatedTime.slice(0,10)
     console.log(date)
    return (
        <div className=' '>
            <div className='grid grid-cols-[1fr_3fr] grid-rows-[8fr_1fr] md:grid-rows-1 sm:grid-cols-[1fr_8fr] gap-2 bg-white px-4 py-4 border  '>
                <div className='flex flex-col items-center justify-between'>
                    {/* <Image src="/hello.png" width={40} height={40}alt="avatar"  className=' h-[60px] w-[60px] md:h-[80px] md:w-[80px]' /> */}
                <div className='h-[50px] w-[50px] bg-[#1A3578] rounded-full text-white flex justify-center items-center capitalize text-xl'><p>{name?name.slice(0,1):"NA"}</p></div>
                <div className='flex flex-col text-2xl items-center my-auto text-[#B8B8B8] '>
                    <AiFillCaretUp/>
                    <h2 className='text-[#CDF27E] font-bold'>04</h2>
                    <AiFillCaretDown/>
                </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <div className='flex gap-4 items-center'>
                            <h2 className='text-[#1A3578] capitalize'>{name}</h2>
                            <h2 className='text-[#1A3578]'>{date}</h2>
                        </div>
                        <button className='hidden md:block bg-[#CDF27E] px-2 md:px-4 py-2'>Questions</button>
                    </div>
                    <h2 className='text-xl font-semibold text-[#1A3578]'>{message}?</h2>
                    <h3 className='text-[#777777]'>{message}</h3>
                <div className='hidden md:flex  bg-[#F1F6F9] justify-between md:mx-6 p-2'> 
                    <button className='bg-[#1A3578] px-4 md:px-4 py-2 text-white rounded-md flex items-center gap-1'><span><AiFillMessage/></span> 10 Answers</button>
                    <button className='bg-[#CDF27E] px-4 md:px-6 py-2 text-black rounded-md flex items-center gap-2'> <span><AiFillEye/></span>03 Views</button>
                </div>
                </div>
                <div className='flex md:hidden col-span-2 bg-[#F1F6F9] justify-between md:mx-6 p-2'> 
                    <button className='bg-[#1A3578] px-8 md:px-4 py-2 text-white rounded-md flex items-center gap-1'><span><AiFillMessage/></span> 10 Answers</button>
                    <button className='bg-[#CDF27E] px-9 md:px-6 py-2 text-black rounded-md flex items-center gap-2'> <span><AiFillEye/></span>03 Views</button>
                </div>
            </div>
        </div>
    )
}

export default CommentsCard