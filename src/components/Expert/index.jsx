import React,{useEffect, useState} from 'react'
import Banner from '../Common/Banner'
import { BsSearch, BsFillCaretRightFill, BsCheckCircleFill, BsFillBackspaceReverseFill } from "react-icons/bs";
import doc1 from '../../../public/images/doc1.png'
import doc2 from '../../../public/images/doc2.png'
import Card from './Card';
import Query from './Query';
import CommentsCard from './CommentsCard';
import Image from 'next/image';
import adsImg from '../../../public/images/ads.png'
import ModalPage from '../Common/Modal';
import { AiOutlineClose } from "react-icons/ai";
import avatar from '../../../public/images/parent3.2.png'
import {db} from '../../firebase';
import {getFirestore, collection, query, getDocs} from 'firebase/firestore';
const ExpertPage = () => {
    const [doctors, setdoctors] = useState([]);
    const [error, setError] = useState(null);
  
      useEffect(() => {
          const fetchData = async () => {
            try {
              const q = query(collection(db, 'expert-doctor'));
              const querySnapshot = await getDocs(q);
              const dataArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setdoctors(dataArray);
            } catch (error) {
              console.log('Error fetching data: ', error);
              setError('Error fetching data. Please try again later.');
            }
          };
      
          fetchData();
          console.log(setdoctors)
        }, []);

        const [comments, setcomments] = useState([]);
        const [error1, setError1] = useState(null);
      
          useEffect(() => {
              const fetchData = async () => {
                try {
                  const q = query(collection(db, 'askQuestions'));
                  const querySnapshot = await getDocs(q);
                  const dataArray1 = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
                  const filteredComments = dataArray1.filter(comment => comment.type === "public");
                  console.log(filteredComments)
                  setcomments(filteredComments);
                  
                  
                } catch (error) {
                  console.log('Error fetching data: ', error);
                  setError('Error fetching data. Please try again later.');
                }
              };
          
              fetchData();
              console.log(setdoctors)
            }, []);
         

    const Button = () => {
        return (
            <button className='text-xl' onClick={() => { setState(false) }}><AiOutlineClose /></button>
        )
    }

    const [state, setState] = useState(false)
    const doctors1 = [
        {
            name: '',
            specialist: "Gynacologits",
            url: doc1
        },
        {
            name: '',
            specialist: "Cardiologist",
            url: doc2
        },
        {
            name: '',
            specialist: "Gynacologits",
            url: doc2
        },
        {
            name: '',
            specialist: "Cardiologist",
            url: doc2
        },
        {
            name: '',
            specialist: "Gynacologits",
            url: doc1
        },
        {
            name: '',
            specialist: "Cardiologist",
            url: doc1
        },
        {
            name: '',
            specialist: "Cardiologist",
            url: doc1
        },
        {
            name: '',
            specialist: "Cardiologist",
            url: doc2
        },
        {
            name: '',
            specialist: "Cardiologist",
            url: doc1
        },
        {
            name: '',
            specialist: "Cardiologist",
            url: doc2
        },

    ]
    const comments1 = [
        {
            name: "",
            title: ""
        },
        {
            name: "",
            title: ""
        },
        {
            name: "",
            title: ""
        },
        {
            name: "",
            title: ""
        }
    ]

    return (
        <div>
            <Banner title={"Ask Expert"} subHeading1={"Home"} subHeading2={"Ask Expert"} />
            <div className='flex flex-col justify-center items-center gap-3 '>
                <h2 className='text-center text-4xl text-[#1A3578] font-bold mt-4 md:mt-8'>Ask Experts</h2>
                <h4 className='text-sm text-center text-[#777777] w-96 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                <div className='flex items-center '>
                    <input type='text' placeholder='Search for Expert' className='py-2 px-8 rounded-l-md border  border-gray-500 outline-none ' />
                    <button className='border px-4 py-2 rounded-r-md hover:bg-[#3b5595] bg-[#1A3578] text-white text-2xl'><BsSearch /></button>
                </div>
            </div>
            <div className='lg:px-48 mt-4 mb-4'>
                <div className='parent3 grid grid-rows-1 gap-2 grid-cols-[2fr_1fr_2fr] sm:grid-cols-3 bg-[#1A3578]    md:h-[220px] md:px-2 '>
                    <div className=' flex items-center justify-center col-span-1 px-1 md:px-1 '>
                        <div className='flex flex-col gap-1 sm:gap-3 '>
                            <h4 className='text-sm sm:text-2xl text-center text-white'>Doctor Consultation</h4>
                            <hr className='bg-[#CDF27E] sm:h-1 sm:w-full' />
                            <div className='flex items-center justify-center gap-1 sm:gap-2'>
                                <h4 className='text-white text-[8px] sm:text-sm'>Appoinment</h4>
                                <div className=' text-xs sm:text-lg text-[#CDF27E]'><BsFillCaretRightFill /></div>
                                <h4 className='text-white text-[8px] sm:text-sm'>Login</h4>
                                <div className='text-xs sm:text-lg text-[#CDF27E] '><BsFillCaretRightFill /></div>
                                <h4 className='text-white text-[8px] sm:text-sm'>Consult</h4>
                            </div>

                            <div className='flex justify-center '>
                                <hr className='bg-[#CDF27E] sm:h-1 w-full' />
                            </div>
                            <div className='flex justify-center mt-2 sm:mt-0'>
                                <button className='bg-[#CDF27E] px-4 py-1 sm:py-2 w-full rounded-md'>Book Now</button>
                            </div>
                        </div>
                    </div>
                    <div className='  flex col-span-1 justify-center items-end'>
                        <Image src={avatar} width={100} height={100} className='h-[120px] w-[110px] sm:h-[220px] sm:w-[210px] object-cover' />
                    </div>
                    <div className=' sm:py-4  flex flex-col col-span-1 justify-center  items-start  sm:gap-1   '>
                        <div className=' sm:w-full  '>
                            <h3 className='hidden sm:block text-white text-xs text-clip sm:text-sm '>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .'}</h3>
                            <h3 className=' sm:hidden text-white  text-xs text-clip sm:text-sm '>{'Lorem ipsum dolor sit amet,'}</h3>
                        </div>
                        <h2 className=' hidden sm:block text-[#CDF27E] self-start text-sm md:text-2xl'>Our Services</h2>
                        <div className=' flex flex-col gap-2 mt-1 sm:bg-transparent sm:w-full sm:py-2 px-2'>
                            <div className='flex gap-2 items-center  '>
                                <div className='text-[#CDF27E] text-sm sm:text-md'><BsCheckCircleFill /></div>
                                <h2 className='text-white text-[9px] sm:text-sm'>Lorem ipsum dolor sit amet</h2>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='text-[#CDF27E] text-sm sm:text-md'><BsCheckCircleFill /></div>
                                <h2 className='text-white text-[9px] sm:text-sm'>Lorem ipsum dolor sit amet</h2>
                            </div>
                            <div className='flex gap-2 items-center '>
                                <div className='text-[#CDF27E] text-sm sm:text-md'><BsCheckCircleFill /></div>
                                <h2 className='text-white text-[9px] -leading-1 sm:text-sm'>Lorem ipsum dolor sit amet</h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex justify-center flex-wrap gap-4 gap-y-2 md:gap-2 mt-12 px-8'>
                {
                    doctors.map((doc, index) => {
                        return (
                            <Card key={index} url={doc.images.url} specialist={doc.speciality} />
                        )
                    })
                }
            </div>
            <Query />
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-[8fr_2fr] md:px-16 gap-4'>
                    <div className='mb-4 col-span-1'>
                    {
                            comments.map((doc,index) => {
                                return (
                                    <CommentsCard key={index} name={doc.sender.username} time={doc.time} message={doc.message}/>
                                    
                                )
                            })
                        }
                    </div>
                    <div className=' hidden col-span-1 md:flex justify-start flex-col gap-4'>
                        <div >
                            <button className=' text-xl  flex justify-end w-[160px] ' onClick={() => { setState(true) }}>
                                <h2 className='text-xs px-3 z-10 bg-[#CDF27E] '>Skipp Add  X</h2>
                            </button>
                            <div className=' z-0 -mt-4'>
                                <Image  width={100} height={100}src={adsImg} className=' h-[600px] w-[160px] ' alt="ads" />
                            </div>
                        </div>
                        <div >
                            <button className=' text-xl  flex justify-end w-[160px] ' onClick={() => { setState(true) }}>
                                <h2 className='text-xs px-3 z-10 bg-[#CDF27E] '>Skipp Add  X</h2>
                            </button>
                            <div className=' z-0 -mt-4'>
                                <Image  width={100} height={100} src={adsImg} className=' h-[600px] w-[160px] ' alt="ads" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPage state={state} Button={Button} />
        </div>
    )
}

export default ExpertPage