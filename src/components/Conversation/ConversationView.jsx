import React, { useState } from "react";
import avatar from '../../../public/images/avatar.png'
import aya from '../../../public/images/aya.png'
import pysio from '../../../public/images/physio.png'
import meet from '../../../public/images/meet.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

const ConversationView = () => {
  const chat = [{
    name: "Mema",
    specialist: "Cardiologist",
    image: aya,
    chats: [

      {
        role: "user",
        text: "Hi there, I want an appointment today",
        time: '12:30'
      },
      {
        role: "admin",
        text: "You can by paying 1500 ",
        time: '12:35'
      },
      {
        role: "user",
        text: "ok",
        time: '12:30'
      },

    ]
  },
  {
    name: "Antony Tidne",
    specialist: "Cardiologist",
    image: pysio,
    chats: [

      {
        role: "user",
        text: "How can i shedule an appointment?",
        time: '12:30'
      },
      {
        role: "admin",
        text: "yes sure, Please share your details.",
        time: '12:35'
      },
      {
        role: "user",
        text: "How can i shedule an appointment?",
        time: '12:40'
      },

    ]
  },
  ]
  const [mIndex, setIndex] = useState(0)
  const [msg, setmsg] = useState(false);

  return (
    <>
      <div className=''>
        <div class="container mx-auto">
          <div class="friends min-w-full border rounded sm:grid sm:grid-cols-3">
            <div class="border-r border-gray-300 bg-white lg:col-span-1 ">
              <div class="flex justify-between items-center  bg-[#1A3578] h-[90px] px-10">
                <span className="flex gap-6">
                  <Image className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]" src={avatar} alt="" />
                  <span className="text-white text-sm lg:text-base font-medium mt-3 lg:mt-6">Emma</span>
                </span>
                <span></span>
                <select class="h-[50px] text-gray-300 bg-[#1A3578] flex">
                  <option selected></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                </select>
              </div>
              <div class="mx-3 my-3">
                <div class="relative text-gray-600 border rounded-lg">
                  <input type="search" class=" w-full py-2 pl-20 bg-gray-100 text-xs lg:text-sm rounded outline-none" name="search"
                    placeholder="search conversation" required />
                  <span class="absolute inset-y-0  ml-10 left-0 flex items-center pl-2">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      viewBox="0 0 24 24" class="w-6 h-6 text-gray-300 ">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </span>

                </div>
              </div>

              <ul class="overflow-auto h-[32rem]">

                <li>
                  {
                    chat.map((doc, index) => {
                      return (
                        <button onClick={() => { setIndex(index) }} key={index}
                          class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b w-full border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                          <Image class="object-cover w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                            src={doc.image} alt="username" />
                          <div class="w-full pb-2">
                            <div class="flex justify-between ">
                              <span class="block ml-2 text-xs lg:text-base  font-semibold mt-1">{doc.name}</span>
                              <span class="block ml-2 text-xs lg:text-sm text-gray-400">25 minutes</span>
                            </div>
                            <span class="block ml-2 text-start text-xs lg:text-sm text-gray-400">{doc.chats[0].text}</span>
                          </div>
                        </button>
                      )
                    })
                  }
                  {/* <a
                    class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                    <Image class="object-cover w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                      src={pysio} alt="username" />
                    <div class="w-full pb-2">
                      <div class="flex justify-between ">
                        <span class="block ml-2 text-xs lg:text-base  font-semibold mt-1">James Williams</span>
                        <span class="block ml-2 text-xs lg:text-sm text-gray-400">25 minutes</span>
                      </div>
                      <span class="block ml-2 text-xs lg:text-sm text-gray-400">I want appointment today.</span>
                    </div>
                  </a> */}
                  {/* <a
                    class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none">
                    <Image class="object-cover w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                      src={aya} alt="username" />
                    <div class="w-full pb-2">
                      <div class="flex justify-between">
                        <span class="block ml-2 font-semibold text-xs lg:text-base mt-1">Julia</span>
                        <span class="block ml-2 text-xs lg:text-sm text-gray-400">50 minutes</span>
                      </div>
                      <span class="block ml-2 text-xs lg:text-sm text-gray-400">Good night</span>
                    </div>
                  </a> */}
                  {/* <a onClick={() => setmsg(!msg)}
                    class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                    <Image class="object-cover w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                      src={avatar} alt="username" />
                    <div class="w-full pb-2">
                      <div class="flex justify-between">
                        <span class="block ml-2 font-semibold text-xs lg:text-base mt-1">Emma</span>
                        <span class="block ml-2 text-xs lg:text-sm text-gray-400">6 hour</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="block ml-2 text-xs lg:text-sm text-gray-400">Good Morning</span>
                        <span class="block ml-2 text-xs h-5 w-5 rounded-full text-center bg-[#C6ED73]">5</span>

                      </div>
                    </div>
                  </a> */}
                </li>
              </ul>
            </div>
            <div class="chat hidden sm:col-span-2 sm:block ">
              <div class="w-full ">
                <div class="relative shadow-2xl flex items-center justify-between p-3 border-b border-gray-300 bg-white h-[90px] px-8">
                  <div class="flex">
                    <Image class="object-cover w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                      src={avatar} alt="username" />
                    <div class="ml-4">
                      <span class="block ml-2 text-sm lg:text-base font-bold text-gray-600">Emma</span>
                      <span class="block ml-2 text-xs font-medium text-gray-400">Cardiologist</span>
                    </div>

                    <span class="absolute w-3 h-3 bg-green-600 rounded-full left-16 top-4     ">
                    </span>
                  </div>
                  <div class="flex gap-x-4">
                    <span className="text-xs lg:text-sm ">Meet Now</span>
                    <Image className="h-5 w-5 lg:h-6 lg:w-6" src={meet} alt="" />
                    <BsThreeDotsVertical className="h-5 w-5 text-[#1A3578]"></BsThreeDotsVertical>
                  </div>

                </div>
                <div class="relative w-full p-6 overflow-y-auto h-[40rem] bg-gray-50">
                  <ul class="space-y-3">
                    {
                      chat[mIndex].chats.map((doc, index) => {
                        return (
                          <>
                            {
                              doc.role=="user"?
                              <li key={index} class="flex justify-start gap-x-2">
                                <Image className="mt-1 w-6 h-6 lg:h-8 lg:w-8" src={chat[mIndex].image} alt="" />
                                <div class="relative max-w-xl px-4 py-2 text-xs lg:text-base text-gray-700  bg-[#C6ED73] rounded shadow">
                                  <span class="block">{doc.text}</span>
                                </div>
                                <span class="text-sm mt-2 text-xs lg:text-base text-gray-400">{doc.time}</span>
                              </li>:
                               <li class="flex justify-end space-x-2">
                               <span class="text-sm mt-2 text-xs lg:text-base text-gray-400">{doc.time}</span>
                               <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                 <span class="block text-xs lg:text-base">{doc.text}</span>
                               </div>
                               <Image className="mt-1 w-6 h-6 lg:h-8 lg:w-8" src={avatar} alt="" />
                             </li>
                            }
                          </>

                        )
                      })
                    }

                    {/* <li class="flex justify-start gap-x-2">
                      <Image className="mt-1 w-6 h-6 lg:h-8 lg:w-8" src={avatar} alt="" />
                      <div class="relative max-w-xl px-4 py-2 text-xs lg:text-base text-gray-700  bg-[#C6ED73] rounded shadow">
                        <span class="block">Hi there, I want an appointment today</span>
                      </div>
                      <span class="text-sm mt-2 text-xs lg:text-base text-gray-400">12:30</span>
                    </li>
                    <li class="flex justify-end space-x-2">
                      <span class="text-sm mt-2 text-xs lg:text-base text-gray-400">12:30</span>
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                        <span class="block text-xs lg:text-base">Hiiii</span>
                      </div>
                      <Image className="mt-1 w-6 h-6 lg:h-8 lg:w-8" src={avatar} alt="" />
                    </li>
                    <li class="flex justify-end mr-8 lg:mr-10">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                        <span class="block text-xs lg:text-base">yes sure, Please share your details.</span>
                      </div>
                    </li>
                    <li class="flex justify-start space-x-2">
                      <Image className="mt-1 w-6 h-6 lg:h-8 lg:w-8" src={avatar} alt="" />
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-[#C6ED73] rounded shadow">

                        <span class="block text-xs lg:text-base">How can i shedule an appointment?
                        </span>

                      </div>
                      <span class="text-sm mt-2 text-gray-400 text-xs lg:text-base">12:30</span>
                    </li> */}
                  </ul>
                </div>

                <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  {/* <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button> */}

                  <input type="text" placeholder="Message"
                    class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message" required />
                  {/* <button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button> */}
                  <button type="submit">
                    <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ConversationView;