import React from "react";
import Image from "next/image";
// import cat_card from "../../../public/images/category-card.png"
// import Link from "next/link";
import { useRouter } from "next/router";

const CategoryCard =({title, description, path, images})=>{

    const router = useRouter();

  const handleClick = () => {
    let targetPage;

    // Conditionally set the targetPage based on the card's name
    switch (title) {
      case "Rehab Center":
        targetPage = "/rehab-list";
        break;
      case "Nursing Center":
        targetPage = "/nurse-list";
        break;
      case "Aya Center":
        targetPage = "/aya-list";
        break;
      case "Physio Center":
        targetPage = "/physio-list";
        break;
      case "Ask Experts":
        targetPage = "/ask-expert";
        break;
      default:
        targetPage = "/rehab-list"; // Default page if no match
    }

    router.push(targetPage);
  };


    return(
        <div className="lg:flex sm:grid sm:grid-cols-2  bg-[#F1F6F9] rounded-e-lg">
            <div className="flex justify-center sm:justify-start lg:w-[300px] sm:w-full  lg:h-[230px] sm:h-[250px]">
                <Image src={images} width={200} height={200} className=" w-[100%]  h-[100%]" style={{objectFit: 'cover'}}  alt=".." />
            </div>
            <div className=" text-center justify-center items-center md:text-left  px-4  lg:py-8 grid h-[170px] md:h-[230px]">
            <span className="  text-[#1A3578] text-xl font-semibold mt-2 ">{title? title:'Rehabilitation center'}</span>
            <span className=" text-sm text-gray-400 lg:mt-2">{description}</span>
            <div>
            <button className="   sm:mt-2 lg:mt-4 text-xs md:text-sm font-medium  bg-[#CDF27E]  text-black  py-2  lg:px-4 rounded-md w-[100px] lg:w-[120px]"
            onClick={handleClick}
            >
                    Read more
            </button>
            </div>
            </div>
            
        </div>
    )
}
export default CategoryCard