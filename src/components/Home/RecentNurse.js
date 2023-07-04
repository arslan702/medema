import React from 'react'
import NurseCard from '../Common/NurseCard';
import avatar from '../../../public/images/avatar.png'
import { useState,useEffect } from 'react';
import {getFirestore, collection, query, getDocs, limit} from 'firebase/firestore';
import { db } from '@/firebase';
const RecentNurse = () => {
    const [nurses, setNurses] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNurse = async () => {
        try {
          const q = query(collection(db, 'nurses'),limit(3));
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
    
    const data = [
        {
            title: "Lorem ipsum",
            url: avatar,
            oldPrice: "$14.00",
            discount: '5%',
            newPrice: "$14.00",
            stars: 5,
            review: 240,
            experience:"Bachelor's in Nursing /10 Years Experience "
        },
        {
            title: "Lorem ipsum",
            url: avatar,
            oldPrice: "$14.00",
            discount: '5%',
            newPrice: "$14.00",
            stars: 4,
            review: 240,
            experience:"Bachelor's in Nursing /10 Years Experience "
        },
        {
            title: "Lorem ipsum",
            url: avatar,
            oldPrice: "$14.00",
            discount: '5%',
            newPrice: "$14.00",
            stars: 5,
            review: 240,
            experience:"Bachelor's in Nursing /10 Years Experience "
        },
     
       
    ]

    return (
      
                // <div className='flex flex-wrap-3 justify-center md:justify-between gap-x-1 w-full bg-black '>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-content-evenly '>
                  {
                  nurses!==[]?
                  nurses.map(nurse => (
            <NurseCard
              key={nurse.id}
              id={nurse.id}
              name={nurse.name}
              education={nurse.education}
              perDay={nurse.perDay}
              perHour={nurse.perHour}
              working={nurse.workingAt}
              years={nurse.years}
              images={nurse.images.url}
              fees={nurse.fees}
            />
          ))
          :
          <h2>Loading</h2>
        }
                </div>

    )
}

export default RecentNurse