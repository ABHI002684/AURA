import React, { useState, useRef, useContext } from "react";
import Card from "../components/Card.jsx";
import Avtaar1 from "../assets/Avtaar1.png";
import Avtaar2 from "../assets/Avtaar2.png";
import Avtaar3 from "../assets/Avtaar3.png";
import Avtaar4 from "../assets/Avtaar4.png";

import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const navigate=useNavigate();
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#000000b6] to-[#075a78] flex justify-center items-center flex-col p-[20px] gap-[20px]">
      <h1 className="text-[white] mb-[30px] text-center text-[30px]  ">
        Select your <span className="text-[#ca0808d9]">Assistant Image</span>
      </h1>
      <div className="w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px] ">
        <Card image={Avtaar1} />
        <Card image={Avtaar2} />

        <Card image={Avtaar3} />
        <Card image={Avtaar4} />
        <div
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#1b1b7b61] border-2 border-white  rounded-2xl hover:shadow-2xl hover:shadow-blue-300 hover:border-4 cursor-pointer flex items-center justify-center 
            ${selectedImage=="input" ? 'border-4 shadow-blue-300 shadow-2xl':null}`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-[white] w-[25px] h-[25px] " />
          )}
          {frontendImage && (
            <img
              src={frontendImage}
              className="h-full object-cover rounded-2xl"
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectedImage && <button className="min-w-[150px] h-[60px] bg-white text-black font-semibold text-[19px] rounded-full cursor-pointer " onClick={()=>navigate('/customize2')}>
        Next
      </button>}
    </div>
  );
};

export default Customize;
