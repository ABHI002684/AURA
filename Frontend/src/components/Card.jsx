import React, { useContext } from "react";
import {userDataContext} from '../context/UserContext.jsx'

const Card = ({ image }) => {
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
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] 
      lg:h-[250px] bg-[#0000ffba] border-2 border-white  
      rounded-2xl hover:shadow-2xl hover:shadow-blue-300 
      hover:border-4 cursor-pointer
      ${selectedImage==image ? 'border-4 shadow-blue-300 shadow-2xl':null}`}
    onClick={()=>setSelectedImage(image)}>

      <img
        src={image}
        className="h-full object-cover overflow-hidden rounded-2xl"
      />
    </div>
  );
};

export default Card;
