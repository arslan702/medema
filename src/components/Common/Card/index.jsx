import React, {useEffect} from 'react';
import Image from 'next/image';
import dummy from '../../../../public/images/dummy.png';
import {useState} from 'react';
import {AiTwotoneStar} from 'react-icons/ai';
import {BsHeartFill} from 'react-icons/bs';
import Link from 'next/link';

const Card = ({
  rehabId,
  title,
  oldPrice,
  newPrice,
  url,
  discount,
  stars,
  review,
  background,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stars > 0) {
      setLoading(true);
    }
  }, [stars]);

  return (
    <div
      className={`${
        background ? background : 'bg-[#F1F6F9]'
      } border px-6 md:px-2 py-6 sm:py-3 text-[#777777]  w-full   rounded-md flex flex-col`}>
      <Image src={dummy} className="h-[200px] w-full px-2" alt="dummy" />
      <div className="pl-2">
        <h2 className="text-xl  text-[#1A3578] pt-2 mt-4 font-medium">
          {title}
        </h2>
        <div className="flex gap-3 py-2 ">
          <s className="text-base">{oldPrice}</s>
          <h4 className="bg-green-100 px-1 ">{discount}%</h4>
          <h4 className="text-base text-[#1A3578]"> {newPrice}</h4>
        </div>
        <div className="text-yellow-400 flex items-center mb-4">
          {loading
            ? Array.from({length: stars}).map((_, index) => (
                <AiTwotoneStar key={index} />
              ))
            : null}

          <div>
            <h2 className="text-black ml-3">{review}</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[6fr_2fr] gap-2 px-2">
      <Link href={`/rehab-detail?rehabId=${rehabId}`}>
        <button className="bg-[#CDF27E] rounded text-sm font-semibold text-black w-full py-2">
          Book Now
        </button>
        </Link>

        <button className=" flex justify-center items-center border-2 rounded">
          <BsHeartFill />{' '}
        </button>
      </div>
    </div>
  );
};

export default Card;
