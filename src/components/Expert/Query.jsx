import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import {getFirestore, collection, query, getDocs, Timestamp} from 'firebase/firestore';
import {addDoc,updateDoc,doc,getDoc } from "firebase/firestore";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Query = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userElement, setUserElement] = useState('');
    const [id,setId]=useState("")
    const router = useRouter()
    const MySwal = withReactContent(Swal)
      const [formData, setFormData] = useState({
        category: "cardiology",
        message: "",
        type: "public",
        sender:"",
       senderId:auth.currentUser?auth.currentUser.uid:"",
       time:Timestamp.fromDate(new Date())
      });
      const [isLoggedIn, setIsLoggedIn] = useState();
   
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setIsLoggedIn(!!user);
          user?setId(user.uid):''
          console.log(user,'user')
       
        });
        unsubscribe();
       
        
          const fetchData = async () => {
            let arr = [];
            const dbRef = collection(db, "expert_categories");
            try {
              const res = await getDocs(dbRef);
              res.docs.map((doc) => {
                arr.push(doc.data());
                console.log(doc.data());
              });
              setOptionElement(arr);
              setLoading(true);
              return arr;
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
          const fetchUser = async () => {
          
           
         
            
            
            try {
              const docRef = doc(db, "users", auth.currentUser.uid);
              const docSnap = await getDoc(docRef);
              setUserElement(docSnap.data());
              setFormData((e)=>({...e,sender:docSnap.data()}))
              console.log(userElement,"user Data")
              setLoading(true);
              return docSnap.data() ;
            } catch (error) {
              console.log(error);
            }
          };
          fetchUser();
     
       
      }, []);
      const handleFormChange = (event) => {
        console.log(event)
        const {name, value } = event.target;
        console.log(name)
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(setFormData)
      };
      const addData = async () => {
        // setBtnAdd("disable");
     if(formData.category!=="" && formData.type!=="" && formData.message!=="" ){
        const newCityRef = collection(db, "askQuestions");
        // const {title,fees,address,powerAvail,doctorAvail,}=formData
    
        try {
          const res = await addDoc(newCityRef, {
            ...formData,
          });
          console.log(res.id);
    
          await updateDoc(doc(db, "askQuestions", res.id), {
            id: res.id,
            
          
          });
     
          MySwal.fire({
            title: <p>Message added SuccessFully</p>,
            didOpen: () => {
              // `MySwal` is a subclass of `Swal` with all the same instance & static methods
              MySwal.showLoading()
            },
          }).then(() => {
            return MySwal.fire(<p>Shorthand works too</p>)
          })
          router.reload("/ask-expert");
        
      
    
      
        } catch (err) {
          console.log(err);
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
       
          })
        }
      }else{
        alert("please fill all field")
      }
      };
      const [loading, setLoading] = useState(false);
      const [optionElement, setOptionElement] = useState([]);
      console.log("query Element");
    
    
     
      const handleCategory = (event) => {
        const {name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
      const handleType = (event) => {
        const {name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(formData)
      };



    
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             setIsLoggedIn(true);
    //         } else {
    //             setIsLoggedIn(false);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    const toggleForm = () => {
        setIsOpen(!isOpen);
    };

    const handleLoginClick = () => {
        router.push('/login');
    };

    // const [category, setcategory] = useState([]);
    // const [error, setError] = useState(null);
  
    //   useEffect(() => {
    //       const fetchData = async () => {
    //         try {
    //           const q = query(collection(db, 'expert_categories'));
    //           const querySnapshot = await getDocs(q);
    //           const dataArray = querySnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data(),
    //           }));
    //           setcategory(dataArray);
    //         } catch (error) {
    //           console.log('Error fetching data: ', error);
    //           setError('Error fetching data. Please try again later.');
    //         }
    //       };
      
    //       fetchData();
    //       console.log(setcategory)
    //     }, []);

    // const handleCategoryChange = (event) => {
    //     setSelectedCategory(event.target.value);
    // };

    // const handleQuestionChange = (event) => {
    //     setQuestion(event.target.value);
    // };

    // const handleMessageTypeChange = (event) => {
    //     setMessageType(event.target.value);
    // };

    // const handleSubmit = () => {
    //     if (!isLoggedIn || !selectedCategory || !question) {
    //         return;
    //     }

    //     const user = auth.currentUser;
    //     const { email, displayName, photoURL } = user;

    //     // Create a new question object
    //     const newQuestion = {
    //         email,
    //         category: selectedCategory,
    //         date: new Date().toISOString(),
    //         image: photoURL,
    //         question,
    //         username: displayName,
    //         messageType,
    //     };

    //     // Save the question to the askQuestions table
    //     db.collection('askQuestions').add(newQuestion)
    //         .then(() => {
    //             // Reset the form
    //             setSelectedCategory('');
    //             setQuestion('');
    //             setMessageType('public');
    //             setIsOpen(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error saving question:', error);
    //         });
    // };

    return (
        <div className='fixed bottom-0 right-0 mr-4 mb-4'>
            <div
                className={`bg-white rounded-lg shadow-lg p-4 ${isOpen ? 'w-96' : 'w-16'
                    }`}
            >
                {isOpen ? (
                    <>
                        <button
                            className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                            onClick={toggleForm}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                        <h2 className='text-2xl text-black font-bold mb-4'>
                            Have a question in your mind?
                        </h2>
                        <div className='flex flex-col'>
                            {!isLoggedIn && (
                                <span
                                    className='cursor-pointer text-blue-500'
                                    onClick={handleLoginClick}
                                >
                                    Login to ask Question from Experts!
                                </span>
                            )}
                            <label className='text-black text-lg px-2 py-2 font-bold'>
                                Select Category
                            </label>
                            <select
                                className='peer py-3 text-xl outline-none px-4 w-auto text-[#777777] border'
                                disabled={!isLoggedIn}
                                // value={selectedCategory}
                                onChange={handleCategory}
                                name="category"
                            >
                              {loading && isLoggedIn? (
            optionElement.map((doc, index) => {
              return (
                <option key={index} value={doc.name} className="">
                  {doc.name}
                </option>
              );
            })
          ) : (
            <option className="">Please LogIn</option>
          )}
        </select>
                            <textarea
                                className='border text-black outline-none px-4 py-3'
                                placeholder='Should I worry about my cholesterol? Cholesterol is necessary...'
                                rows={3}
                            //  value={question}
                                onChange={handleFormChange}
                                disabled={!isLoggedIn}
                                name="message" 
                            />
                            <div className='w-full overflow-x-hidden'>
                                <select
                                    className='peer py-4 text-xl outline-none px-4 w-full mt-4 text-[#777777] border'
                                    disabled={!isLoggedIn}
                                    // value={messageType}
                                    onChange={handleType}
                                    name="type"
                                >
                                    <option value='public'> Publicize your question</option>
                                    <option value='private'> Privatize your question</option>
                                </select>
                                <div className='mt-4'>
                                    <button
                                        className='bg-[#CDF27E] w-full md:w-48 py-3 text-xl font-semibold'
                                        disabled={!isLoggedIn}
                                        onClick={addData}
                                    >
                                        Submit now
                                    </button>
                                </div>
                            </div>
                        </div>
                       
                    </>
                ) : (
                    <button
                        className='bg-[#CDF27E] rounded-full w-16 h-16 flex items-center justify-center text-white text-xl font-semibold'
                        onClick={toggleForm}
                    >
                        +
                    </button>
                )}
            </div>
        </div>
    );
};
export default Query;