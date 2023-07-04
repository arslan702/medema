import React, { useState, useEffect } from 'react'
import Banner from '../Common/Banner'
import { FaCheckCircle, FaCaretDown } from "react-icons/fa";
import Image from 'next/image'
import useRazorpay from "react-razorpay";
import { useRouter } from 'next/router';
import { db,auth } from '../../firebase';
import { addDoc, collection, doc, getDoc ,updateDoc,Timestamp} from 'firebase/firestore';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Detail = () => {
    const [imgView, setImgView] = useState(false);
    const Razorpay = useRazorpay();
    const router = useRouter();
    const { id,from,to } = router.query;
    const [ayaData, setayaData] = useState(null);
    const [isLogined,setIsLoggedIn]=useState(false)
    const [userData,setUserData]=useState(null)
    const MySwal = withReactContent(Swal)
console.log(id,from,to)
const [formData,setFormData]=useState({
    package: 'perday',
    bookFrom:from!==""?from:'',
    bookTo:to!==""?to:'',
    patientName:'',
    altPhone:'',
    phone:"",
    dob:'',
    message:'',
    patientGender:'male',
   
  


})
    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setFormData((e)=>({...e,patientId:user.uid}))
             console.log(user.uid,'user')
             setIsLoggedIn(true)
           });
           unsubscribe();
        const fetchayaData = async () => {
            try {
                const docRef = doc(db, 'aya', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setayaData(docSnap.data());
                    console.log('Fetched aya data:', docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.log('Error fetching aya data: ', error);
            }
        };

        if (id) {
            fetchayaData();
        }
    }, [id]);


    const handleFormChange =(event)=>{
       const {name,value}=event.target
       setFormData((e)=>({...e,[name]:value}))
    }
    const addData = async () => {
  const {bookFrom,bookTo,patientName,altPhone,message}=formData;
  if(isLogined){
        if( bookFrom!=="" && bookTo !=="" && patientName!=="" && altPhone!=="" && message!==""){
        const ayaRef = collection(db, "orders")
        try {
          const res = await addDoc(ayaRef,{
            receiverId:ayaData.id,
            amount: Number(ayaData?.fees * diffDays),
            receiverName:ayaData.name,
            patientDetail:{...formData},
            type:"aya",
            status:"pending",
            payment:"unpaid"
            
          })
         

          await updateDoc(doc(db, "orders", res.id), {
            id: res.id,
           Date:Timestamp.fromDate(new Date())
          });
          MySwal.fire('Your Booking application submitted')
          setTimeout(()=>{

              router.reload('aya-detail')
          },3000)
        }catch(err){
            console.log(err)
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
             
           
              })
        }
    }else{
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all field',
       
          })
    }}else{
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please LogIn first',
       
          })
    }
      }

    const fromDate = new Date(formData?.bookFrom)
    const toDate = new Date(formData?.bookTo)
       
    const timeDiff = Math.abs(fromDate.getTime() - toDate?.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const handlePayment = useCallback(async () => {
        // await OrderApi.createOrder({
        //   products: cart?.products,
        //   customerId: localStorage.getItem("id"),
        //   amount: sum,
        //   date: serverTimestamp(),
        //   status: "New",
        // });
    
        const options = {
          key: "rzp_test_sfwDxiLmKtw7ol",
          amount: Number(ayaData?.fees * diffDays) * 100,
          currency: "INR",
          name: "ARQ",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          handler: (res) => {
            console.log(res);
          },
          prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "03334814702",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
    
        const rzpay = new Razorpay(options);
        rzpay.open();
      }, [Razorpay]);

    return (
        <div className='mb-12'>
            <Banner title={''} subHeading1={'Home'} subHeading2={'aya care Details'} />
            <div className='lg:flex lg:flex-row justify-center sm:flex sm:flex-col w-full px-6 md:px-12 mt-12 gap-6 mx-0'>
                <div className='lg:w-[30%] sm:w-[100%] gap-10  col-span-1 md:col-span-2 gap-10'>
                
                    <div className='bg-white py-2 px-2'>
                        {ayaData ? (
                            <div className='flex gap-2'>
                                <div>
                                    <Image src={ayaData.images.url} width={100} height={100} alt={ayaData.images.name} className=" w-[100%]  h-[100%]" style={{ objectFit: 'cover' }} />
                                </div>
                                <div className=''>
                                    <div className='flex gap-2 items-center'>
                                        <h2 className='text-lg text-black font-semibold'>{ayaData.name}</h2> {/*added text-black class*/}
                                        <div className='text-green-600'><FaCheckCircle /></div>
                                    </div>
                                    <div>
                                        <h3 className='text-sm text-[#1A3578]'>Education: {ayaData.education} /{ayaData.experience} Years Experience </h3>
                                    </div>
                                    <div>
                                        <h3 className='text-xs text-[#B1B1B1]'>Working at {ayaData.workingAt} Hospital</h3>
                                    </div>
                                    <div className=' w-full mt-2'>
                                        <button className='bg-[#1A3578] w-full text-white md:px-6 py-2 rounded-md' >Home Care Service</button>

                                    </div>
                                    <div className='  w-full mt-2'>
                                        <button className='bg-[#CDF27E] w-full text-black px-6 py-2  rounded-md' >Fee: {ayaData?.fees}/- (per day)</button>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    {/* <div className='mt-4'>
                        <div>
                            <div className='grid grid-cols-3 gap-0'>
                                <div className='bg-[#F0F0F0] col-span-2 '>
                                    <h2 className='py-2 px-6 border border-black rounded-l-md'>Set Availability</h2>
                                </div>
                                <div className='bg-[#F0F0F0] col-span-1 flex justify-center '>
                                    <div className='py-2 px-3 w-full border text-2xl text-end border-black rounded-r-md flex justify-center'>
                                        <button className='hover:text-[#1A3578]' onClick={() => { setImgView(true) }}>
                                            <FaCaretDown />
                                        </button></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-end mt-4'>
                                <div className='grid grid-cols-1 grid-rows-7 text-xs w-full '>

                                    <div className='grid  grid-cols-3 border border-gray-100'>
                                        <div className='col-span-1 flex justify-center bg-[#B7B7B7] '>
                                            <button>
                                                <h2 className="text-lg">Mon</h2>
                                            </button>
                                        </div>
                                        <div className='col-span-2 flex py-2 justify-center bg-[#1A3578] text-white flex-col items-center'>
                                            <h2>Available </h2>
                                            <h2>From 7 am to 8 am </h2>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 border border-gray-100'>
                                        <div className='col-span-1 flex justify-center bg-[#B7B7B7] '>
                                            <button>
                                                <h2 className="text-lg">Tues</h2>
                                            </button>
                                        </div>
                                        <div className='col-span-2 flex py-2 justify-center bg-[#1A3578] text-white flex-col items-center'>
                                            <h2>Available </h2>
                                            <h2>From 7 am to 8 am </h2>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 border border-gray-100'>
                                        <div className='col-span-1 flex justify-center bg-[#B7B7B7] '>
                                            <button>
                                                <h2 className="text-lg" >Wed</h2>
                                            </button>
                                        </div>
                                        <div className='col-span-2 flex py-2 justify-center  text-black flex-col items-center'>
                                            <h2>Not availabe </h2>
                                            <h2> </h2>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 border border-gray-100'>
                                        <div className='col-span-1 flex justify-center bg-[#B7B7B7] '>
                                            <button>
                                                <h2 className="text-lg">Thu</h2>
                                            </button>
                                        </div>
                                        <div className='col-span-2 flex py-2 justify-center bg-[#1A3578] text-white flex-col items-center'>
                                            <h2>Available </h2>
                                            <h2>From 7 am to 8 am </h2>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 border border-gray-100'>
                                        <div className='col-span-1 flex justify-center bg-[#B7B7B7] '>
                                            <button>
                                                <h2 className="text-lg" >Fri</h2>
                                            </button>
                                        </div>
                                        <div className='col-span-2 flex py-2 justify-center bg-[#1A3578] text-white flex-col items-center'>
                                            <h2>Available </h2>
                                            <h2>From 7 am to 8 am </h2>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 border border-gray-100'>
                                        <div className='col-span-1 flex justify-center bg-[#B7B7B7] '>
                                            <button>
                                                <h2 className="text-lg">Sat</h2>
                                            </button>
                                        </div>
                                        <div className='col-span-2 flex py-2 justify-center  text-black flex-col items-center'>
                                            <h2>Not availabe</h2>
                                            <h2></h2>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 border border-gray-100'>
                                        <div className='col-span-1 flex justify-center bg-[#B7B7B7] '>
                                            <button>
                                                <h2 className="text-lg" >Sun</h2>
                                            </button>
                                        </div>
                                        <div className='col-span-2 flex py-2 justify-center bg-[#1A3578] text-white flex-col items-center'>
                                            <h2>Available </h2>
                                            <h2>From 7 am to 8 am </h2>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='lg:w-[55%] sm:w-[100%] bg-white px-6'>
                    <div className='mt-8'>
                        <h2 className='text-xl font-bold'>Details:</h2>
                        <h4 className='mt-4 text-[#777777]'>Assessing, observing, and speaking to patients. Recording details and symptoms of patient medical history and current health. Preparing patients for exams and treatment. Administering medications and treatments, then monitoring patients for side effects and reactions.</h4>
                    </div>
                    <div className=' mt-6 md:mt-8'>
                        <h2 className='my-4 text-[#1A3578] text-2xl font-semibold'>Reserve Shedule</h2>
                        <div className='mb-1 ml-2'>Amount: {Number(ayaData?.fees * diffDays) || ayaData?.fees}</div>
                        <div className='grid grid-cols-2 grid-rows-[80px_80px_80px_80px_120px_80px] ' >
                        <div className='flex flex-col px-2 col-span-2'>
                            <label className=''> Select package</label>
                                <select onChange={handleFormChange} name='package' className='h-[42px] text-lg px-2 bg-transparent border border-black rounded-md'>
                                    <option value='perday'>Per day</option>
                                    <option value='weekly'>Weekly</option>
                                    <option value='monthly'>Monthly</option>
                                </select>
                            </div>
                            <div className='flex flex-col row-span-1 px-2'>
                                <label className=''> From </label>
                                <input onChange={handleFormChange}  value={from!==""?from:formData.bookFrom} name='bookFrom' type='date' placeholder='12-May-2023' className='py-2 px-2 bg-transparent border border-black rounded-md' />

                            </div>
                            <div className='flex flex-col row-span-1 px-2'>
                                <label className=''> To </label>
                                <input onChange={handleFormChange} value={to!==""?to:formData.bookTo} name='bookTo' type='date' placeholder='14-May-2023' className='py-2 px-2 bg-transparent border border-black rounded-md' />

                            </div>
                            <div className='flex flex-col row-span-1 px-2'>
                                <label className=''> Patient Name</label>
                                <input onChange={handleFormChange} name='patientName' type='text' placeholder='John Doe' className='py-2 px-2 bg-transparent border border-black rounded-md' />

                            </div>
                            <div className='flex flex-col row-span-1 px-2'>
                                <label className=''> Gender</label>
                                <select onChange={handleFormChange} name='patientGender' className='h-[42px] text-lg px-2 bg-transparent border border-black rounded-md'>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>

                            </div>
                            <div className='flex flex-col  px-2 '>
                                <label className=''> Phone Number</label>
                                <input onChange={handleFormChange} name='phone' type='text' placeholder='+91 555 334 4' className='py-2 px-2 bg-transparent border border-black rounded-md' />

                            </div>
                            <div className='flex flex-col px-2'>
                                <label className='hidden md:block'> Alternative number</label>
                                <label className='block md:hidden'> Alternative num</label>
                                <input onChange={handleFormChange} name='altPhone' type='text' placeholder='+91 555 334 4' className='py-2 px-2 bg-transparent border border-black rounded-md' />

                            </div>
                            <div className='flex flex-col px-2 col-span-2'>
                                <label className='md:mt-0'> Date of Birth</label>
                                <input onChange={handleFormChange} name='dob' type='date' placeholder='+91 555 334 4' className='py-2 px-2 bg-transparent border border-black rounded-md' />

                            </div>
                            <div className='flex flex-col px-2 mt-0 col-span-2'>
                                <label className='rounded-t-md px-2 border border-black '> Reason For Booking</label>
                                <textarea onChange={handleFormChange} name='message' placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' className='py-2 px-2 bg-transparent  border-b border-x rounded-b-md border-black ' />

                            </div>
                            <div className='col-span-2 md:mt-4'>
                                <button className='bg-[#CDF27E] w-full py-2 rounded-lg ' onClick={handlePayment}>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Detail;