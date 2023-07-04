import React from 'react'
import NurseCard from '../Common/NurseCard';
import avatar from '../../../public/images/avatar.png'
import { useState,useEffect } from 'react';
import { db } from '@/firebase';
import { getDocs,collection,doc,query, limit } from 'firebase/firestore';
const RecentAya = () => {

    const [aya, setAya] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchAya = async () => {
        try {
          const q = query(collection(db, 'aya'),limit(3));
          const querySnapshot = await getDocs(q);
          const dataArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('Fetched Ayas:', dataArray); // working here!
          setAya(dataArray);
        } catch (error) {
          console.log('Error fetching data: ', error);
          setError('Error fetching data. Please try again later.');
        }
      };
  
      fetchAya();
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
        }
       
    ]

    return (
      
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-content-evenly '>
                   
                    { aya!==[]?
                       aya.map(nurse => (
                        <NurseCard
                          key={nurse.id}
                          id={nurse.id}
                          address={nurse.address}
                          details={nurse.details}
                          discount={nurse.discount}
                          education={nurse.education}
                          email={nurse.email}
                          experience={nurse.experience}
                          fees={nurse.fees}
                          gender={nurse.gender}
                          images={nurse.images.url}
                          name={nurse.name}
                          phone={nurse.phone}
                          working={nurse.workingAt}
                          recentWorkPlace={nurse.recentWorkPlace}
                          type="aya" // if data is for aya
                        />
                      ))
                        :
                        <h2>Loading...</h2>
                    }
                </div>

    )
}

export default RecentAya