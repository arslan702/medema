import Banner from '../Common/Banner';
import {BsSearch, BsGeoAltFill, BsArrowDownUp} from 'react-icons/bs';
import {AiOutlineAim} from 'react-icons/ai';
import {FaFilter} from 'react-icons/fa';
import {db} from '../../firebase';
import React, {useEffect, useState} from 'react';
import {getFirestore, collection, query, getDocs} from 'firebase/firestore';

import NurseCard from '../Common/NurseCard';
import avatar from '../../../public/images/avatar.png';

const List = () => {
  const [nurses, setNurses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNurse = async () => {
      try {
        const q = query(collection(db, 'nurses'));
        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched Nurses:', dataArray); // working here!
        setNurses(dataArray);
      } catch (error) {
        console.log('Error fetching data: ', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchNurse();
  }, []);

  console.log({nurses})

  return (
    <div className="flex-1 text-[#777777]">
      <Banner
        title={'Nursing Care List'}
        subHeading1={'Home'}
        subHeading2={'Rehabilitation List'}
      />
      <div className="py-12 w-full  flex justify-center flex-col items-center gap-2">
        <h1 className="text-[#1A3578] text-3xl font-bold">Nurse List</h1>
        <div className="w-[60%] md:w-[40%] mb-6">
          <h4 className="text-center text-[#777777] text-sm">
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

          <select className="border px-4 py-4 md:py-0 md:h-full" placeholder="">
            <option value={'Sort By'} disabled selected hidden>
              Sort By
            </option>
            <option value={'Hello'}>Hello</option>
          </select>

          <select className="border w-72 md:w-auto px-6 py-3 md:py-0 md:h-full">
            <option disabled selected hidden value={'Filter'}>
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
      <div className=" flex justify-center items-center px-30  md:px-[70px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-[20px] lg:grid-cols-3 gap-4 place-content-evenly ">
          {nurses?.map(nurse => (
            <NurseCard
              key={nurse?.id}
              id={nurse?.id}
              name={nurse?.name}
              education={nurse?.education}
              perDay={nurse?.fees}
              perHour={nurse?.fees}
              working={nurse?.workingAt}
              years={nurse?.years}
              images={nurse?.images?.url}
              experience={nurse?.experience}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
