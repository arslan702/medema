import React from "react";
import NurseCard from "../Common/NurseCard";
import avatar from "../../../public/images/avatar.png";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { getDocs, collection, query,limit } from "firebase/firestore";
import PhysioCard from "../Common/PhysioCard";
const RecentPysio = () => {
  const [physio, setPhysio] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhysio = async () => {
      try {
        const q = query(collection(db, "physio"),limit(3));
        const querySnapshot = await getDocs(q);
        const dataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched physios:", dataArray); // working here!
        setPhysio(dataArray);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchPhysio();
  }, []);
  const data = [
    {
      title: "Lorem ipsum",
      url: avatar,
      oldPrice: "$14.00",
      discount: "5%",
      newPrice: "$14.00",
      stars: 5,
      review: 240,
      experience: "Bachelor's in Nursing /10 Years Experience ",
    },
    {
      title: "Lorem ipsum",
      url: avatar,
      oldPrice: "$14.00",
      discount: "5%",
      newPrice: "$14.00",
      stars: 4,
      review: 240,
      experience: "Bachelor's in Nursing /10 Years Experience ",
    },
    {
      title: "Lorem ipsum",
      url: avatar,
      oldPrice: "$14.00",
      discount: "5%",
      newPrice: "$14.00",
      stars: 5,
      review: 240,
      experience: "Bachelor's in Nursing /10 Years Experience ",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-content-evenly ">
      {
        physio!==[]?
      physio.map((physio) => (
        <NurseCard
          key={physio.id}
          id={physio.id}
          name={physio.name}
          education={physio.education}
          gender={physio.gender}
          experience={physio.experience}
          homeCare={physio.homeCare}
          clinicCare={physio.clinicCare}
          working={physio.workingAt}
          images={physio.images.url}
          alt={physio.images.name}
          fees={physio.fees}
          type='physio'
        />
      ))
      :
      <h2>Loading...</h2>
    }
    </div>
  );
};

export default RecentPysio;
