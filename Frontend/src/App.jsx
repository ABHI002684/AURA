import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Customize from "./pages/Customize.jsx";
import Home from "./pages/Home.jsx";
import { userDataContext } from "./context/UserContext.jsx";
import Customize2 from "./pages/Customize2.jsx";

const App = () => {
  const { userData, setUserData } = useContext(userDataContext);
  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/customize"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/customize"
          element={userData ? <Customize /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/customize2"
          element={userData ? <Customize2 /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/"
          element={
            userData?.assistantName && userData?.avtar ? (
              <Home />
            ) : (
              <Navigate to={"/customize"} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
