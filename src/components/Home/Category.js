import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


 const HomeCategory=()=>{
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categorySnapshot = await getDocs(collection(db, "categories"));
            const categoryData = categorySnapshot.docs.map((doc) => doc.data());
            setCategories(categoryData);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, []);

    return(
        <div className="grid md:grid-cols-2 gap-10 ">
        <div className="p-4 md:p-10 bg-[#1A3578] grid w-full flex justify-center items-center md:rounded-xl h-[200px] md:h-[230px]">
        <span className="text-xl md:text-2xl text-[#CDF27E] font-medium">
            Categories
        </span>
        <span className="text-white text-sm font-light leading-6 sm:leading-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
         et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
        </span>

        </div>

        {categories.map((category) => (
        <CategoryCard
          key={category.id} 
          title={category.name}
          description={category.description}
          path={category.url}
          images={category.images.url}
        />
      ))}
        
        </div> 
        
    )
}
export default HomeCategory