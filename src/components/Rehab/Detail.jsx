import React, {useState, useEffect} from 'react';
import Banner from '../Common/Banner';
import mapPic from '../../../public/images/map.png';
import img1 from '../../../public/images/img1.png';
import img2 from '../../../public/images/img2.png';
import img3 from '../../../public/images/img3.png';
import {
  AiTwotoneStar,
  AiOutlineClockCircle,
  AiOutlineBulb,
  AiOutlineAccountBook,
  AiTwotoneCar,
} from 'react-icons/ai';
import doctor from '../../../public/images/svg/doctor.svg';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {db,auth} from '../../firebase';
import { addDoc, collection, doc, getDoc ,updateDoc,Timestamp} from 'firebase/firestore';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Detail = () => {
  const [imgView, setImgView] = useState(img2);
  const router = useRouter();
  const {rehabId} = router.query;
  const [rehabData, setRehabData] = useState(null);
  const [isLogined,setIsLoggedIn]=useState(false)
  const [userData, setUserData] = useState(null);
const [ userId,setUserId]=useState(null)
  const { id,from,to } = router.query;


  const MySwal = withReactContent(Swal)
  const [formData,setFormData]=useState({
    bookFrom:'',
    bookTo:'',
    patientName:'',
    altPhone:'',
    phone:"",
    dob:'',
    message:'',
    patientGender:'male',
    patientId:'',

  


})
  console.log(rehabData);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        setFormData((e)=>({...e,patientId:user.uid}))
        console.log(user.uid,'user')
        setIsLoggedIn(true)
      }

    });
    unsubscribe();
    const fetchRehabData = async () => {
      try {
        const docRef = doc(db, 'rehab', rehabId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRehabData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching rehab data: ', error);
      }
    };

    if (rehabId) {
      fetchRehabData();
    }
  }, [rehabId]);

  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice.toFixed(2);
  };

  const calculateStars = review => {
    const rating = Math.floor(review / 20);
    return Math.min(rating, 5);
  };

 
const handleFormChange =(event)=>{
   const {name,value}=event.target
   setFormData((e)=>({...e,[name]:value}))
}
const addData = async () => {
const {bookFrom,bookTo,patientName,altPhone,message}=formData;
if(isLogined){
    if( bookFrom!=="" && bookTo !=="" && patientName!=="" && altPhone!=="" && message!==""){
    const rehabRef = collection(db, "orders")
    try {
      const res = await addDoc(rehabRef,{
        receiverId:rehabData.id,
        receiverName:rehabData.name,
        patientDetail:{...formData},
        type:"rehab",
        status:"pending",
        payment:"unpaid"
        
      })
     

      await updateDoc(doc(db, "orders", res.id), {
        id: res.id,
       Date:Timestamp.fromDate(new Date())
      });
      MySwal.fire('Your Booking application submitted')
      setTimeout(()=>{

          router.reload('rehab-detail')
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
  return (
    <div className="mb-12">
      <Banner
        title={'Rehabilitaion Details'}
        subHeading1={'Home'}
        subHeading2={'Rehabilitation Detals'}
      />
      <div className="grid grid-cols-1 md:grid-cols-7 w-full px-4 lg:px-28 mt-12 ">
        <div className=" grid grid-rows-[300px] lg:grid-rows-[650px_150px] col-span-1 md:col-span-3 gap-2 lg:gap-9 rounded-lg">
          <div>
            <Image
              className="p-4 lg:p-0 h-full w-full object-fill "
              loading="lazy"
              src={imgView}
              alt="img2"
              width={200}
              height={150}
            />
          </div>
          <div className=" grid grid-cols-3 gap-2 grid-rows-1 h-[80px] lg:h-[150px] px-4">
            <div>
              <button
                onClick={() => {
                  setImgView(rehabData?rehabData.images.url:img1);
                }}>
                {' '}
                <Image
                  className=" w-full object-cover h-[150px] lg:h-[150px] "
                  src={rehabData?rehabData.images.url:img1}
                  alt="img2"
                  width={200}
                  height={150}
                />
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setImgView(rehabData?rehabData.images.url1:img2);
                }}>
                {' '}
                <Image
                  className=" w-full h-[150px] object-cover "
                  src={rehabData?rehabData.images.url1:img2}
                  alt="img3"
                  width={200}
                  height={150}
                />
              </button>
            </div>
            <div className="row-span-1">
              <button
                onClick={() => {
                  setImgView(rehabData?rehabData.images.url2:img3);
                }}>
                {' '}
                <Image
                  className=" h-[150px]  w-[150px] object-cover "
                  src={rehabData?rehabData.images.url2:img3}
                  alt="img1"
                  width={200}
                  height={150}
                />
              </button>
            </div>
          </div>
        </div>
        {rehabData ? (
          <div className="col-span-1 md:col-span-4 bg-white px-6 py-8">
            <div>
              <h2 className="text-2xl text-[#1A3578] font-bold  w-[80%]">
                {rehabData.title}
              </h2>
            </div>
            <div className="grid lg:flex justify-between px-4 items-center">
              <div className="flex gap-3 mt-2 text-sm font-medium">
                <s className="text-lg text-[#ABABAB] text-sm">
                  {rehabData.fees}
                </s>
                <h4 className="bg-green-100 ">
                  {rehabData.discount}%
                </h4>
                <span className="text-sm text-[#1A3578] font-semibold">
                  {calculateDiscountedPrice(rehabData.fees, rehabData.discount)}
                </span>
              </div>
              <div className="text-[#F8C100] flex items-center gap-2">
                <div className="flex">
                  {Array.from({length: calculateStars(rehabData.reviews)}).map(
                    (_, index) => (
                      <AiTwotoneStar key={index} />
                    ),
                  )}
                </div>
                <h2 className="text-black text-base">{rehabData.reviews}</h2>
                <h2 className="text-[#ABABAB] text-base">{'(234)'}</h2>
              </div>
            </div>
            <div className="text-black lg:flex mt-4">
              <h4>{rehabData.description}</h4>
            </div>
            <div>
              <h4 className="text-xl text-[#1A3578] font-bold mt-4">
                Why reserve this Rehab
              </h4>{' '}
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-start lg:gap-2 gap-y-4">
            {rehabData.doctorAvail && (
              <div className="flex items-center gap-2">
                <div className="text-lg bg-[#CDF27E] px-1 py-1">
                  <AiOutlineClockCircle />
                </div>
                <h4 className='text-black'>24/7 Doctors and Nurse available</h4>
              </div>
              )}
               {rehabData.powerBackup && (
              <div className="flex items-center justify-end md:mx-auto gap-2">
                <div className="text-lg bg-[#CDF27E] px-1 py-1">
                  <AiOutlineBulb />
                </div>
                <h4 className='text-black'>24/ Power backup</h4>
              </div>
              )}
              <div className="flex items-center  gap-2">
                <div className="text-lg bg-[#CDF27E] px-1 py-1">
                  <Image
                    src={doctor}
                    alt="doctor"
                    className="h-5  w-5 bg-[#CDF27E]  "
                  />
                </div>
                <h4 className='text-black'>Certified Doctors and Nurse</h4>
              </div>
              {rehabData.parkingFacility && (
              <div className="flex items-center md:mx-auto  gap-2 lg:pl-4">
                <div className="text-lg bg-[#CDF27E]  px-1 py-1">
                  <AiTwotoneCar />
                </div>
                <h4 className='text-black'>Parking Facility</h4>
              </div>
              )}
              <div className="flex items-center   gap-2">
                <div className="text-lg bg-[#CDF27E]  px-1 py-1">
                  <AiOutlineAccountBook />
                </div>
                <h4 className='text-black'>{'(Count)  of booking in last one month'}</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 h-[100px] mt-6 gap-4 ">
              <div className="bg-[#1A3578] px-4 py-3 text-white">
                <h3 className="text-lg">Rehab Adreess</h3>
                <h4 className="mt-2 text-sm text-gray-200 font-normal">
                  161 Trumpeter Ave, Soldotna, Alaska 99669, USA
                </h4>
              </div>
              <div>
                <Image
                  src={mapPic}
                  className="h-[100px] w-full object-cover"
                  alt="map"
                />
              </div>
            </div>
            <div className=" mt-36 md:mt-8">
              <h2 className="my-4 text-[#1A3578] text-2xl font-semibold">
                Reserve Shedule
              </h2>
              <div className="grid grid-cols-2 grid-rows-[80px_80px_80px_80px_120px_80px] ">
                <div className="flex flex-col row-span-1 px-2">
                  <label className=""> From </label>
                  <input
                    type="date"
                    placeholder="12-May-2023"
                    className="py-2 px-2 bg-transparent border border-black rounded-md"
                    onChange={handleFormChange}
                    name='bookFrom'
                  />
                </div>
                <div className="flex flex-col row-span-1 px-2">
                  <label className=""> To </label>
                  <input
                    type="date"
                    placeholder="14-May-2023"
                    className="py-2 px-2 bg-transparent border border-black rounded-md"
                    onChange={handleFormChange}
                    name='bookTo'
                  />
                </div>
                <div className="flex flex-col row-span-1 px-2">
                  <label className=""> Patient Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="py-2 px-2 bg-transparent border border-black rounded-md"
                    onChange={handleFormChange}
                    name='patientName'
                  />
                </div>
                <div className="flex flex-col row-span-1 px-2">
                  <label className=""> Gender</label>
                  <select onChange={handleFormChange} name='patientGender' className="h-[42px] text-lg px-2 bg-transparent border border-black rounded-md">
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>
                <div className="flex flex-col  px-2 ">
                  <label className=""> Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 555 334 4"
                    className="py-2 px-2 bg-transparent border border-black rounded-md"
                    onChange={handleFormChange}
                    name='phone'
                  />
                </div>
                <div className="flex flex-col px-2">
                  <label className="hidden md:block"> Alternative number</label>
                  <label className="block md:hidden"> Alternative num</label>
                  <input
                    type="text"
                    placeholder="+91 555 334 4"
                    className="py-2 px-2 bg-transparent border border-black rounded-md"
                    onChange={handleFormChange}
                    name='altPhone'
                  />
                </div>
                <div className="flex flex-col px-2 col-span-2">
                  <label className="md:mt-0"> Date of Birth</label>
                  <input
                    type="date"
                    placeholder="+91 555 334 4"
                    className="py-2 px-2 bg-transparent border border-black rounded-md"
                    onChange={handleFormChange}
                    name='dob'
                  />
                </div>
                <div className="flex flex-col px-2 mt-2 col-span-2">
                  <label className="rounded-t-md px-2 border border-black ">
                    {' '}
                    Reason For Booking
                  </label>
                  <textarea
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    className="py-2 px-2 bg-transparent  border-b border-x rounded-b-md border-black "
                  onChange={handleFormChange}
                  name='message'
                  />
                </div>
                <div className="col-span-2 md:mt-4">
                  <button className="bg-[#CDF27E] w-full py-2 rounded-lg " onClick={addData}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Detail;
