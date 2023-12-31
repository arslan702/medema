import React, { useState, useEffect, useCallback } from "react";
import Banner from "../Common/Banner";
import { FaCheckCircle } from "react-icons/fa";
import useRazorpay from "react-razorpay";
import Image from "next/image";
import { useRouter } from "next/router";
import { db, auth } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Detail = () => {
  const [imgView, setImgView] = useState(false);
  const Razorpay = useRazorpay();
  const router = useRouter();
  const { id, from, to } = router.query;
  const [nursesData, setnursesData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLogined, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const MySwal = withReactContent(Swal);
  console.log({ nursesData });
  const [formData, setFormData] = useState({
    package: "perday",
    bookFrom: from !== "" ? from : "",
    bookTo: to !== "" ? to : "",
    patientName: "",
    altPhone: "",
    phone: "",
    dob: "",
    message: "",
    patientGender: "male",
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setFormData((e) => ({ ...e, patientId: user.uid }));
        console.log(user.uid, "user");
        setIsLoggedIn(true);
      }
    });
    unsubscribe();
    unsubscribe();
    const fetchnursesData = async () => {
      try {
        const docRef = doc(db, "nurses", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setnursesData(docSnap.data());
          console.log("Fetched nurses data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching nurses data: ", error);
      }
    };

    if (id) {
      fetchnursesData();
    }
  }, [id]);

  const handleFormChange = (event) => {
    const selectedDate = event.target.value;
    if (isDateDisabled(selectedDate)) {
      // Show an error or alert message here
      //   alert("This date is not available");
      setErrorMessage("Not available on this date");
      event.target.value = ""; // Clear the selected date
      return;
    }
    const { name, value } = event.target;
    setFormData((e) => ({ ...e, [name]: value }));
  };

  const handleCloseModal = () => {
    setErrorMessage('');
  };

  const isDateDisabled = (date) => {
    // return nursesData?.unavailability.includes(date);
    if (nursesData?.availability === 'weekdays') {
        const selectedDay = new Date(date).getDay();
        return nursesData?.unavailability.includes(date) || (selectedDay === 0 || selectedDay === 6);
      }
      if (nursesData?.availability === 'weekend') {
        const selectedDay = new Date(date).getDay();
        return nursesData?.unavailability.includes(date) || (selectedDay > 0 && selectedDay < 6);
      }
      return nursesData?.unavailability.includes(date);
  };

  const addData = async () => {
    const { bookFrom, bookTo, patientName, altPhone, message } = formData;
    if (isLogined) {
      if (
        bookFrom !== "" &&
        bookTo !== "" &&
        patientName !== "" &&
        altPhone !== "" &&
        message !== ""
      ) {
        const nursesRef = collection(db, "orders");
        try {
          const res = await addDoc(nursesRef, {
            receiverId: nursesData?.auth_id,
            amount: Number(nursesData?.fees * diffDays),
            receiverName: nursesData.name,
            patientDetail: { ...formData },
            type: "nurse",
            status: "pending",
            payment: "unpaid",
          });
          await updateDoc(doc(db, "orders", res.id), {
            id: res.id,
            Date: Timestamp.fromDate(new Date()),
          });
          MySwal.fire("Your Booking application submitted");
          setTimeout(() => {
            router.reload("nurses-detail");
          }, 3000);
        } catch (err) {
          console.log(err);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } else {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all field",
        });
      }
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please LogIn first",
      });
    }
  };

  const fromDate = new Date(formData?.bookFrom);
  const toDate = new Date(formData?.bookTo);

  const timeDiff = Math.abs(fromDate.getTime() - toDate?.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const handlePayment = useCallback(async () => {
    // await OrderApi.createOrder({
    //   products: cart?.products,
    //   customerId: localStorage.getItem("id"),
    //   amount: sum,
    //   date: serverTimestamp(),
    //   status: "New",
    // });

    const options = {
      key: "rzp_test_sfwDxiLmKtw7ol",
      amount: Number(nursesData?.fees * diffDays) * 100,
      currency: "INR",
      name: "ARQ",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "03334814702",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="mb-12">
      <Banner
        title={""}
        subHeading1={"Home"}
        subHeading2={"nurses care Details"}
      />
      <div className="lg:flex lg:flex-row justify-center sm:flex sm:flex-col w-full px-6 md:px-12 mt-12 gap-6 mx-0">
        <div className="lg:w-[30%] sm:w-[100%] gap-10  col-span-1 md:col-span-2 gap-10">
          <div className="bg-white py-2 px-2">
            {nursesData ? (
              <div className="flex gap-2">
                <div>
                  <Image
                    src={nursesData.images.url}
                    width={100}
                    height={100}
                    alt={nursesData.images.name}
                    className=" w-[100%]  h-[100%]"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="">
                  <div className="flex gap-2 items-center">
                    <h2 className="text-lg text-black font-semibold">
                      {nursesData.name}
                    </h2>{" "}
                    {/*added text-black class*/}
                    <div className="text-green-600">
                      <FaCheckCircle />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#1A3578]">
                      Education: {nursesData.education} /{nursesData.experience}{" "}
                      Years Experience{" "}
                    </h3>
                  </div>
                  <div>
                    <h3 className="text-xs text-[#B1B1B1]">
                      Working at {nursesData.workingAt} Hospital
                    </h3>
                  </div>
                  <div className=" w-full mt-2">
                    <button className="bg-[#1A3578] w-full text-white md:px-6 py-2 rounded-md">
                      Home Care Service
                    </button>
                  </div>
                  <div className="  w-full mt-2">
                    <button className="bg-[#CDF27E] w-full text-black px-6 py-2  rounded-md">
                      Fee: {nursesData?.fees}/- (per day)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="mt-4">
            <div></div>
          </div>
        </div>
        <div className="lg:w-[55%] sm:w-[100%] bg-white px-6">
          <div className="mt-8">
            <h2 className="text-xl font-bold">Details:</h2>
            <h4 className="mt-4 text-[#777777]">
              Assessing, observing, and speaking to patients. Recording details
              and symptoms of patient medical history and current health.
              Preparing patients for exams and treatment. Administering
              medications and treatments, then monitoring patients for side
              effects and reactions.
            </h4>
          </div>
          <div className=" mt-6 md:mt-8">
            <h2 className="my-4 text-[#1A3578] text-2xl font-semibold">
              Reserve Shedule
            </h2>
            {errorMessage && (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{errorMessage}</span>
          <span onClick={handleCloseModal} class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
            <div className="mb-1 ml-2">
              Amount: {Number(nursesData?.fees * diffDays) || nursesData?.fees}
            </div>
            <div className="grid grid-cols-2 grid-rows-[80px_80px_80px_80px_120px_80px] ">
              <div className="flex flex-col px-2 row-span-1">
                <label className=""> Select package</label>
                <select
                  onChange={handleFormChange}
                  name="package"
                  className="h-[42px] text-lg px-2 bg-transparent border border-black rounded-md"
                >
                  <option value="perday">Per day</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex flex-col px-2 row-span-1">
                <label className=""> Select Rate</label>
                <select
                  onChange={handleFormChange}
                  name="rate"
                  className="h-[42px] text-lg px-2 bg-transparent border border-black rounded-md"
                >
                  <option value="perday">Per Hour</option>
                  <option value="weekly">Per Day</option>
                </select>
              </div>
              <div className="flex flex-col row-span-1 px-2">
                <label className=""> From </label>
                <input
                  onChange={handleFormChange}
                  name="bookFrom"
                  type="date"
                //   disabled={isDateDisabled(formData?.bookFrom)}
                  placeholder="12-May-2023"
                  className="py-2 px-2 bg-transparent border border-black rounded-md"
                />
              </div>
              <div className="flex flex-col row-span-1 px-2">
                <label className=""> To </label>
                <input
                  onChange={handleFormChange}
                  name="bookTo"
                  type="date"
                  placeholder="14-May-2023"
                  className="py-2 px-2 bg-transparent border border-black rounded-md"
                />
              </div>
              <div className="flex flex-col row-span-1 px-2">
                <label className=""> Patient Name</label>
                <input
                  onChange={handleFormChange}
                  name="patientName"
                  type="text"
                  placeholder="John Doe"
                  className="py-2 px-2 bg-transparent border border-black rounded-md"
                />
              </div>
              <div className="flex flex-col row-span-1 px-2">
                <label className=""> Gender</label>
                <select
                  onChange={handleFormChange}
                  name="patientGender"
                  className="h-[42px] text-lg px-2 bg-transparent border border-black rounded-md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col  px-2 ">
                <label className=""> Phone Number</label>
                <input
                  onChange={handleFormChange}
                  name="phone"
                  type="text"
                  placeholder="+91 555 334 4"
                  className="py-2 px-2 bg-transparent border border-black rounded-md"
                />
              </div>
              <div className="flex flex-col px-2">
                <label className="hidden md:block"> Alternative number</label>
                <label className="block md:hidden"> Alternative num</label>
                <input
                  onChange={handleFormChange}
                  name="altPhone"
                  type="text"
                  placeholder="+91 555 334 4"
                  className="py-2 px-2 bg-transparent border border-black rounded-md"
                />
              </div>
              <div className="flex flex-col px-2 col-span-2">
                <label className="md:mt-0"> Date of Birth</label>
                <input
                  onChange={handleFormChange}
                  name="dob"
                  type="date"
                  placeholder="+91 555 334 4"
                  className="py-2 px-2 bg-transparent border border-black rounded-md"
                />
              </div>
              <div className="flex flex-col px-2 mt-0 col-span-2">
                <label className="rounded-t-md px-2 border border-black ">
                  {" "}
                  Reason For Booking
                </label>
                <textarea
                  onChange={handleFormChange}
                  name="message"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  className="py-2 px-2 bg-transparent  border-b border-x rounded-b-md border-black "
                />
              </div>
              <div className="col-span-2 md:mt-4">
                <button
                  className="bg-[#CDF27E] w-full py-2 rounded-lg "
                  onClick={addData}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
