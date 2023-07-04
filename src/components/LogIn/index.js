import React, { useState } from 'react';
import logo1 from '../../../public/images/logo1.png'
import Image from 'next/image'
import { AiOutlineGooglePlus, } from "react-icons/ai";
import { BsFacebook, BsGoogle, BsApple } from "react-icons/bs";
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';

const LogInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('User signed in successfully:', user);
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className={` parent h-[115vh]  lg:h-[100vh] `}  >
      <div className='bg-[#1A3578C8] font-[poppinsregular] flex flex-1 flex-col h-full px-6 py-4'>
        <div className='fixed top-6 left-6 '>
          <Image src={logo1} className='h-[50px] w-[130px] lg:h-[80px] lg:w-[200px] object-contain lg:ml-16 ' alt='logo' />
        </div>
        <div className='flex justify-center items-center -mt-24 flex-1 lg:mt-0  '>
          <form onSubmit={handleSignIn}>
            <div className=' justify-center  bg-slate-950 bg-opacity-30 w-full sm:w-[450px] rounded-md flex flex-col gap-3 px-8 shadow-sm shadow-blue-950 py-6 '>
              <h1 className=' text-2xl lg:text-3xl font-[barlowregular] text-[#C6ED73]'>Log in</h1>
              <h4 className='text-xs lg:text-sm mb-1 text-gray-300'>To Keep connected with us please Log in with your personal information .</h4>
              <div className='flex flex-col mt-2'>
                <label className='text-xs lg:text-sm text-[#C6ED73] -mb-1'>User Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' className='text-xs lg:text-sm py-2 outline-none bg-transparent border mt-2 px-4  text-white rounded-md' />
              </div>
              <div className='flex flex-col'>
                <label className='text-xs lg:text-sm text-[#C6ED73] -mb-1'>Enter Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='text-xs lg:text-sm py-2 outline-none bg-transparent border mt-2 px-4  text-white rounded-md' />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <input type='checkbox' className='h-4 w-4' />
                  <h2 className='text-xs lg:text-sm text-gray-300'>Remember Me</h2>
                </div>
                <div>
                  <Link href='/forget'>
                    <h2 className='text-xs lg:text-sm text-[#C6ED73]'>Forgot Password?</h2>
                  </Link>
                </div>
              </div>
              <div className='mt-4'>
                <button className='w-full py-2 hover:bg-[#7ba129] text-sm bg-[#C6ED73] font-semibold rounded-md'>Log in</button>
              </div>
              <div className='flex justify-center text-xs mt-2 lg:text-sm text-gray-300'>
                <h2>Or Log in with</h2>
              </div>
              <div className='flex justify-between items-center  px-4'>
                <button className='hover:text-white  text-sm text-[#C6ED73]'>
                  <div className='flex gap-2 items-center  '>
                    <div className=' mb-1'><BsFacebook /></div>
                    <div className=''>Facebook</div>
                  </div>
                </button>
                <button className='hover:text-white text-sm  text-[#C6ED73]'>
                  <div className='flex gap-2 items-center  '>
                    <div className='mb-1'><BsGoogle /></div>
                    <div className=' '>Google</div>
                  </div>
                </button>
                <button className='hover:text-white text-sm  text-[#C6ED73]'>
                  <div className='flex gap-2 items-center  '>
                    <div className='mb-1'><BsApple /></div>
                    <div className=''>Apple</div>
                  </div>
                </button>
              </div>
              <div className='text-center text-gray-300 py-4'>
                <Link href='/Signup'>
                  <button className='text-xs lg:text-sm hover:text-[#C6ED73] '>New user? Create an account now.</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogInPage
