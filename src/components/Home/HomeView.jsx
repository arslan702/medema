import React from 'react'
import Navbar from '../Common/Navbar/Navbar'
import Footer from '../Common/Footer/index'
import HomeCategory from './Category'
import HomeSlider from './slider'
import RecentRehab from './RecentRehab'
import RecentNurse from './RecentNurse'
import RecentAya from './RecentAya'
import RecentPysio from './RecentPysio'

const HomeView = () => {
  return (
    <div className='bg-white'>
   
        <Navbar/>
        <HomeSlider/>
        <div className='parent4 bg-white pt-10 md:pt-20 px-[30px] pt-[20px] md:px-[70px] mx-auto max-w-[1440px] mb-20'>
          <HomeCategory />

          <div className='mt-12 md:mt-20 '>
            <h1 className='text-[#1A3578] text-2xl text-center md:text-start md:text-3xl font-semibold'>Recently Viewed Rehabilitation</h1>
            <div className='md:w-[50%] mb-4'>
              <h4 className='text-center md:text-start text-sm mt-2 mb-8 text-[#777777]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
            </div>
            <RecentRehab />
          </div>

          <div className='mt-12 md:mt-20 '>
            <h1 className='text-[#1A3578] text-2xl text-center md:text-start md:text-3xl font-semibold'>Recently Viewed Nursing</h1>
            <div className='md:w-[50%] mb-4'>
              <h4 className='text-center md:text-start text-sm mt-2 mb-8 text-[#777777]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
            </div>
            <RecentNurse />
          </div>
          <div className='mt-12 md:mt-20 '>
            <h1 className='text-[#1A3578] text-2xl text-center md:text-start md:text-3xl font-semibold'>Recently Viewed Aya Care</h1>
            <div className='md:w-[50%] mb-4'>
              <h4 className='text-center md:text-start text-sm mt-2 mb-8 text-[#777777]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
            </div>
            <RecentAya />
          </div>
                    
          <div className='mt-12 md:mt-20 '>
            <h1 className='text-[#1A3578] text-2xl text-center md:text-start md:text-3xl font-semibold'>Recently Viewed Pysio Care</h1>
            <div className='md:w-[50%] mb-4'>
              <h4 className='text-center md:text-start text-sm mt-2 mb-8 text-[#777777]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
            </div>
            <RecentPysio />
          </div>

        </div>

    <Footer />
    </div>
  )
}

export default HomeView