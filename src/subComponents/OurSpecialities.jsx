import React from "react";
import { SiWeightsandbiases } from "react-icons/si";
import { MdFitnessCenter, MdElectricCar, MdOutlinePets } from "react-icons/md";
import { FaSailboat } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";

const OurSpecialities = () => {
  const specialities = [
    {
      id: 1,
      title: "Seafront",
      icon: <SiWeightsandbiases />,
      subText: "Wake up to the water"
    },
    {
      id: 2,
      title: "Pet Friendly",
      icon: <MdOutlinePets />,
      subText: "Bring your companions"
    },
    {
      id: 3,
      title: "Electric Car",
      icon: <MdElectricCar />,
      subText: "Charging on site"
    },
    {
      id: 4,
      title: "Fitness/Gym",
      icon: <MdFitnessCenter />,
      subText: "Stay on your routine"
    },
    {
      id: 5,
      title: "Boat Morning",
      icon: <FaSailboat />,
      subText: "Harbor mornings"
    },
  ];
  return (
    <>
      <section id="ourSpecialities">
        <h1>OUR PROPERTIES SPECIALITIES</h1>
        <div className="specialities_container">
          {
            specialities.map(element=>{
              return(
                <div className="card" key={element.id}>
                    <div className="icon">{element.icon}</div>
                    <div className="title_text">{element.title}</div>
                    <div className="subtitle_text">{element.subText} <FaLongArrowAltRight/></div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  );
};

export default OurSpecialities;