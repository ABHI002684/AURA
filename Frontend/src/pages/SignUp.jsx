import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(userDataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]= useState(false);
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      console.log(result);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErr(err.response.data.message)
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[650px] max-w-[400px] bg-[#0000001e] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px] px-[20px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className="text-blue-400">AURA</span>
        </h1>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter Your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        />

        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        />

        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
            className="w-full h-full rounded-full outline-none bg-transparent  border-white text-white placeholder-gray-300 px-[20px] py-[10px] "
          />
          {!showPassword && (
            <IoEye
              className="absolute top-[20px] right-[20px] text-[white] h-[25px] w-[25px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOffSharp
              className="absolute top-[20px] right-[20px] text-[white] h-[25px] w-[25px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {err.length>0 && <p className="text-red-500 text-[18px] ">
          {err}
          </p>}
        <button className="min-w-[150px] h-[60px] bg-white text-black font-semibold text-[19px] rounded-full cursor-pointer "
          disabled={loading}>
          {loading?"loading ...":"Sign Up"}
        </button>
        <p className="text-[white] text-[18px] ">
          {" "}
          Already have an account?
          <span
            className="text-red-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
