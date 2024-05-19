import Dashboard  from "./components/Dashboard/Dashboard";
import React from "react";
import {Routes,Route} from "react-router-dom"
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

const App = () => {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
     </Routes>
    </>
  );
};

export default App;
