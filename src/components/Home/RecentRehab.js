import React from 'react'
import Card from '../../components/Common/Card/index'
import dummy from '../../../public/images/dummy.png'
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { getDocs, collection, query,limit } from "firebase/firestore";
const RehabList = () => {
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
    const data1 = [
        {
            title: "Lorem ipsum",
            url: dummy,
            oldPrice: "$14.00",
            discount: '5%',
            newPrice: "$14.00",
            stars: 5,
            review: 240,
        },
        {
            title: "Lorem ipsum",
            url: dummy,
            oldPrice: "$14.00",
            discount: '5%',
            newPrice: "$14.00",
            stars: 4,
            review: 240,
        },
        {
            title: "Lorem ipsum",
            url: dummy,
            oldPrice: "$14.00",
            discount: '5%',
            newPrice: "$14.00",
            stars: 4,
            review: 240,
        },
        {
            title: "Lorem ipsum",
            url: dummy,
            oldPrice: "$14.00",
            discount: '5%',
            newPrice: "$14.00",
            stars: 4,
            review: 240,
        },
    ]

  return (
    <>  
                <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 place-content-evenly '>
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
  </>
  )
}

export default RehabList