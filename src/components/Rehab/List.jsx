import Banner from '../Common/Banner';
import {BsSearch, BsGeoAltFill, BsArrowDownUp} from 'react-icons/bs';
import {AiOutlineAim} from 'react-icons/ai';
import {FaFilter} from 'react-icons/fa';
import Card from '../Common/Card';
import dummy from '../../../public/images/dummy.png';
import React, {useEffect, useState} from 'react';
import {db} from '../../firebase';
import {getFirestore, collection, query, getDocs} from 'firebase/firestore';
import Link from 'next/link';


const List = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'rehab'));
        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataArray);
      } catch (error) {
        console.log('Error fetching data: ', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const calculateDiscountedPrice = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice.toFixed(2); 
  };

  // Function for rating:
  const calculateStars = (review) => {
   
    const rating = Math.floor(review / 20); 
    return rating;
  };

  return (
    <div className="flex-1 text-[#777777]  mb-20">
      <Banner
        title={'Rehabilitaion List'}
        subHeading1={'Home'}
        subHeading2={'Rehabilitation List'}
      />
      <div className="py-12 w-full  flex justify-center flex-col items-center gap-2">
        <h1 className="text-[#1A3578] text-3xl font-bold">
          Rehabilitaion List
        </h1>
        <div className="px-[30px] md:px-0 md:w-[40%]">
          <h4 className="text-center text-[#777777] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </h4>
        </div>
        <div className="md:flex items-center hidden flex-wrap justify-center  md:h-[40px]">
          <input
            type="text"
            className="border px-8 py-3 md:py-0 md:h-full outline-none"
            placeholder="Search for Nurse"
          />

          <select
            className="border px-4 py-4 md:py-0 md:h-full text-lg "
            placeholder="">
            <option value={'Sort By'} disabled selected hidden>
              Sort By
            </option>
            <option value={'Hello'}>Hello</option>
          </select>

          <select className="border w-72 md:w-auto px-6 py-3 text-lg md:py-0 md:h-full">
            <option className="" disabled selected hidden value={'Filter'}>
              Filter
            </option>
            <option value={'Hello'}>Hello</option>
          </select>
          <button className="border px-4  py-3 md:py-0 md:h-full hover:bg-[#3b5595] bg-[#1A3578] text-white text-2xl">
            <BsSearch />
          </button>
        </div>
        <div className=" md:hidden flex h-[50px] gap-1">
          <div className="flex items-center h-[50px]">
            <input
              type="text"
              className="  h-full outline-none border rounded-l-md px-2"
              placeholder="search"
            />
            <button className="border px-4  h-full  md:py-0 md:h-full rounded-r-md hover:bg-[#3b5595] bg-[#1A3578] text-white text-2xl">
              <BsSearch />
            </button>
          </div>
          <button className="px-4 h-full border border-[#1A35785E] bg-white ">
            <BsArrowDownUp />
          </button>
          <button className="px-4 h-full border border-[#1A35785E] bg-white ">
            <FaFilter />
          </button>
        </div>
        <button>
          <div className="bg-white px-8 py-2 mt-2 items-center flex gap-4 rounded-sm shadow-sm hover:shadow-md">
            <h4>Detect my location</h4>
            <div className="text-xl text-[#1A3578]">
              <AiOutlineAim />
            </div>
          </div>
        </button>
      </div>
      <div className="px-[30px] md:px-[70px] ">
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 place-content-evenly ">

        {data.map(doc => (
            <Card
              key={doc.id}
              rehabId={doc.id} 
              title={doc.name}
              oldPrice={doc.fees}
              newPrice={calculateDiscountedPrice(doc.fees, doc.discount)}
              discount={doc.discount}
              stars={calculateStars(doc.review)}
              review={doc.review}
              background="bg-white"
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default List;
