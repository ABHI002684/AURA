import React,{useContext, useState} from 'react'
import { userDataContext } from '../context/UserContext';

const Customize2 = () => {
    const {userData} =useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  return (
        <div className="w-full h-[100vh] bg-gradient-to-t from-[#000000b6] to-[#075a78] flex justify-center items-center flex-col p-[20px] gap-[20px]">
            <h1 className="text-[white] mb-[30px] text-center text-[30px]  "> 
                Enter Your <span className="text-[#ca0808d9]" >Assistant Name </span>
            </h1>

            <input
          type="text"
          required
          onChange={(e)=> setAssistantName(e.target.value)}
          value={assistantName}
          placeholder="e.g. Cira"
          className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        />

         {assistantName.length>0 && <button className="min-w-[300px] h-[60px] bg-white text-black font-semibold text-[19px] rounded-full cursor-pointer " onClick={()=>navigate('/customize2')}>
        Create Your Assistant
      </button>}
        </div>
  )
}

export default Customize2
