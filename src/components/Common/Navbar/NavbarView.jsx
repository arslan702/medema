import React, { useState, useEffect } from "react";
import logo from "../../../../public/images/logo.png";
import phoneImg from "../../../../public/images/phone.png";
import emailImg from "../../../../public/images/email.png";
import fb from "../../../../public/images/facebook.png";
import twitter from "../../../../public/images/twitter.png";
import p from "../../../../public/images/p.png";
import menu from "../../../../public/images/menu.png";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "../../../firebase";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const NavbarView = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      backgroundColor: "#1A3578",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const Router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const MySwal = withReactContent(Swal);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const register = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const values = {
        username: username,
        email: email,
        role: role,
      };

      await setDoc(userRef, values, { merge: true });
      console.log();
      MySwal.fire("User created successfully!");
      Router.push("/login");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: error,
      });
      console.error("Error creating user:", error.message);
    }
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [toggle, setToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      console.log(user, "user");
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        Router.reload("/ask-expert");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
      return (
        <button
          onClick={handleLogout}
          className="text-base bg-[#CDF27E] py-2 px-6 rounded-md sm:px-6"
        >
          Logout
        </button>
      );
    } else {
      return (
        <>
          <Link href="/login">
            <button className="text-base bg-[#CDF27E] py-2 px-6 rounded-md sm:px-6">
              Login
            </button>
          </Link>
          <Link href="/Signup">
            <button className="text-sm text-[#1A3578] border border-[#1A3578] rounded-md py-2 px-4 sm:px-4">
              Sign Up
            </button>
          </Link>
          <button
            onClick={openModal}
            className="text-sm text-[#1A3578] border border-[#1A3578] rounded-md py-2 px-4 sm:px-4"
          >
            Join Us
          </button>
        </>
      );
    }
  };

  return (
    <div className="navbar-container   ">
      <div className="hidden lg:contents">
        <div className="w-full m-auto bg-[#1A3578]  md:border-b font-medium py-2 border-gray-500  flex text-white justify-between ">
          <div className="flex ml-4 sm:ml-[10%] gap-x-4 sm:gap-x-12 mt-1">
            <div className="flex  sm:gap-x-2">
              <Image
                className="h-3 w-4 md:h-4 md:w-5 mt-[2px]"
                src={phoneImg}
                alt="phone"
              />
              <span className="text-[10px] md:text-sm font-normal">
                +91 34 4555 5
              </span>
            </div>
            <div className="flex gap-x-1 sm:gap-x-2">
              <Image
                className="h-3 w-4 md:h-4 md:w-5 mt-[2px]"
                src={emailImg}
                alt="phone"
              />
              <span className="text-[10px] md:text-sm font-normal">
                Company@email.com
              </span>
            </div>
          </div>
          <div className="flex mr-4 sm:mr-[10%] gap-x-1 sm:gap-x-2">
            <div className=" bg-gray-500 h-5 w-5 md:h-7 md:w-7 flex justify-center items-center rounded-full">
              <Image width={20} height={20} src={fb} alt="phone" />
            </div>
            <div className=" bg-gray-500 h-5 w-5 md:h-7 md:w-7 flex justify-center items-center rounded-full">
              <Image width={20} height={20} src={twitter} alt="phone" />
            </div>
            <div className=" bg-gray-500 h-5 w-5 md:h-7 md:w-7 flex justify-center items-center rounded-full">
              <Image width={50} height={50} src={p} alt="phone" />
            </div>
            <div className=" bg-gray-500 h-5 w-5 md:h-7 md:w-7 flex justify-center items-center rounded-full">
              <Image
                width={20}
                height={20}
                className=" rounded-xl"
                src={fb}
                alt="phone"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" m-auto md:bg-[#E6EBF9]  md:border-b font-medium py-2 border-gray-500  flex text-black justify-between items-center">
        <div className="flex justify-between  w-full lg:w-[20%] gap-x-1 pl-2">
          {/* mobile bar icons */}
          <Image
            className="ml-8 h-[50px] w-[120px] lg:ml-[120px]"
            src={logo}
            alt="logo"
          />
          <span
            onClick={() => setToggle(!toggle)}
            className="lg:hidden  pr-8 sm:pr-20 mt-2 lg:mt-6 "
          >
            <div className="h-8 w-10 bg-[#1A3578] rounded-sm flex justify-center items-center">
              <Image src={menu} className="text-white  h-6 w-6" size={30} />
            </div>
          </span>
          {/* logo */}
        </div>
        {/* desktop menu */}
        <div>
          <nav>
            <ul className="lg:flex hidden items-center gap-x-10 font-medium -ml-44">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/conversation">My orders</Link>
              </li>
              <li>
                <Link href="/ask-expert">Ask Experts</Link>
              </li>
              <li>
                <a>Win 1500</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="lg:flex hidden px-2 items-center font-normal gap-x-4 mr-[7%]">
          {renderAuthButtons()}
        </div>
      </div>
      {/* mobile menu */}
      {toggle && (
        <div className=" absolute top-16 py-3 mobile menu lg:hidden z-10 h-full w-2/3 bg-white">
          <ul className=" flex flex-col gap-y-3 px-2 ">
            <li className="bg-[#00538F]/80 text-white py-2 px-2 rounded-md">
              <Link href="/"> Home </Link>
            </li>
            <li className=" text-black py-2 px-2 rounded-md">
              <Link href="/conversation">My orders</Link>
            </li>
            <li className=" text-black py-2 px-2 rounded-md">
              <Link href="/ask-expert">Ask Experts</Link>
            </li>
            <li className=" text-black py-2 px-2 rounded-md">
              <a to="">Win 1500</a>
            </li>
          </ul>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-xl text-white">
            X
          </button>
        </div>

        <form onSubmit={register}>
          <div className="mt-24 lg:mt-0 w-full sm:w-[450px] rounded-md flex flex-col gap-2 px-8 shadow-sm  py-4">
            <h1 className="text-2xl lg:text-3xl text-[#C6ED73]">Join Us</h1>
            <h4 className="text-sm mb-1 text-gray-300">
              To Keep connected with us please Sign up with your personal
              information.
            </h4>
            <div className="flex flex-col mt-2">
              <label className="text-xs lg:text-sm text-[#C6ED73]   -mb-1 mt-2">
                User Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
                className="text-xs lg:text-sm py-2 bg-transparent border outline-none mt-2 px-4 text-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs lg:text-sm text-[#C6ED73] -mb-1 mt-2">
                Email Address
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                placeholder="Enter Your Email"
                className="text-xs lg:text-sm py-2 bg-transparent outline-none border mt-2 px-4 text-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs lg:text-sm text-[#C6ED73] -mb-1 mt-2">
                Enter Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                placeholder="Password"
                className="text-xs lg:text-sm py-2 bg-transparent outline-none border mt-2 px-4 text-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs lg:text-sm text-[#C6ED73] -mb-1 mt-2">
                Re-enter Password
              </label>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                value={confirmPassword}
                placeholder="Repeat Password"
                className="text-xs lg:text-sm py-2 outline-none bg-transparent border mt-2 px-4 text-gray-300 rounded-md"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-xs lg:text-sm text-[#C6ED73] -mb-1 mt-2">
                I would Like to Join As A
              </label>
              <select
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                placeholder="Repeat Password"
                className="text-xs lg:text-sm py-2 outline-none bg-transparent border mt-2 px-4 text-gray-300 rounded-md"
              >
                <option value="aya">Aya</option>
                <option value="rehab">Rehab</option>
                <option value="physio">Physio</option>
                <option value="nurse">Nurse</option>
                <option value="expert">Expert / Hospital</option>
              </select>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full text-xs lg:text-sm py-3 hover:bg-[#7ba129] bg-[#C6ED73] font-semibold rounded-md"
              >
                Register
              </button>
            </div>
            <div className="text-center text-gray-300 py-4">
              <Link href="/login">
                <button className="text-xs lg:text-sm hover:text-[#C6ED73]">
                  Already have an account?
                  <span className="text-[#C6ED73]">Log in.</span>{" "}
                </button>
              </Link>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NavbarView;
