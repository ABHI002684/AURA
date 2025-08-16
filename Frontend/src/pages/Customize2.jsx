import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );

  const [loading, setLoading] = useState(false);
  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("avtar", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(result.data);
      setUserData(result.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#000000b6] to-[#075a78] flex justify-center items-center flex-col p-[20px] gap-[20px] relative ">
      <IoArrowBackSharp
        className="absolute top-[30px] left-[30px] text-[white] w-[25px] h-[25px] cursor-pointer"
        onClick={() => navigate("/customize")}
      />
      <h1 className="text-[white] mb-[30px] text-center text-[30px]  ">
        Enter Your <span className="text-[#ca0808d9]">Assistant Name </span>
      </h1>

      <input
        type="text"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
        placeholder="e.g. Cira"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
      />

      {assistantName.length > 0 && (
        <button
          className="min-w-[300px] h-[60px] bg-white text-black font-semibold text-[19px] rounded-full cursor-pointer "
          disabled={loading}
          onClick={() => {
            navigate("/customize2");
            handleUpdateAssistant();
          }}
        >
          {!loading ? "Create Your Assistant" : "loading..."}
        </button>
      )}
    </div>
  );
};

export default Customize2;
