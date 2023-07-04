import React, { useState } from 'react';
import logo1 from '../../../public/images/logo1.png';
import Image from 'next/image';
import Link from 'next/link';
import { db, auth, storage } from "../../firebase";
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";


const SignUpPage = () => {

   const router = useRouter();

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState('')
   const [error, setError] = useState('')

   const validatePassword = () => {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      setError('');
      return true;
    };


   const register = async (e) => {
      e.preventDefault();

      if (!validatePassword()) {
         return;
      }

      try {

         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const values = {
      username: username,
      email: email,
      role:"user"
         };

         await setDoc(userRef, values, { merge: true });
         console.log("User created successfully!");
         router.push('/login');
      } catch (error) {
         console.error("Error creating user:", error);
      }
   };

   return (
      <div className={`parent h-[110vh] lg:h-[100vh]`}>
         <div className='bg-[#1A3578C8] font-[poppinsregular] flex flex-1 flex-col h-full px-6 py-4'>
            <div className='fixed top-6 left-6'>
               <Image src={logo1} className='h-[50px] w-[130px] lg:h-[80px] lg:w-[200px] object-contain lg:ml-16' alt='logo' />
            </div>
            <div className='flex justify-center items-center -mt-24 flex-1 lg:mt-0'>
               <form onSubmit={register}>
                  <div className='mt-24 lg:mt-0 bg-slate-950 bg-opacity-30 w-full sm:w-[450px] rounded-md flex flex-col gap-2 px-8 shadow-sm shadow-blue-950 py-4'>
                     <h1 className='text-2xl lg:text-3xl text-[#C6ED73]'>Sign Up</h1>
                     <h4 className='text-sm mb-1 text-gray-300'>To Keep connected with us please Sign up with your personal information.</h4>
                     <div className='flex flex-col mt-2'>
                        <label className='text-xs lg:text-sm text-[#C6ED73]   -mb-1 mt-2'>User Name</label>
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Your Name' className='text-xs lg:text-sm py-2 bg-transparent border outline-none mt-2 px-4 text-gray-300 rounded-md' />
                     </div>
                     <div className='flex flex-col'>
                        <label className='text-xs lg:text-sm text-[#C6ED73] -mb-1 mt-2'>Email Address</label>
                        <input type='email' onChange={(e) => setEmail(e.target.value)} required value={email} placeholder='Enter Your Email' className='text-xs lg:text-sm py-2 bg-transparent outline-none border mt-2 px-4 text-gray-300 rounded-md' />
                     </div>
                     <div className='flex flex-col'>
                        <label className='text-xs lg:text-sm text-[#C6ED73] -mb-1 mt-2'>Enter Password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} required value={password} placeholder='Password' className='text-xs lg:text-sm py-2 bg-transparent outline-none border mt-2 px-4 text-gray-300 rounded-md' />
                     </div>
                     <div className='flex flex-col'>
                        <label className='text-xs lg:text-sm text-[#C6ED73] -mb-1 mt-2'>Re-enter Password</label>
                        <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} required value={confirmPassword} placeholder='Repeat Password' className='text-xs lg:text-sm py-2 outline-none bg-transparent border mt-2 px-4 text-gray-300 rounded-md' />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                     </div>
                     <div className='mt-6'>
                        <button type='submit' className='w-full text-xs lg:text-sm py-3 hover:bg-[#7ba129] bg-[#C6ED73] font-semibold rounded-md'>Sign Up</button>
                     </div>
                     <div className='text-center text-gray-300 py-4'>
                        <Link href='/login'>
                           <button className='text-xs lg:text-sm hover:text-[#C6ED73]'>Already have an account?<span className='text-[#C6ED73]'>Log in.</span> </button>
                        </Link>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default SignUpPage;