import React, { useState } from "react";
import "./App.css";

import Navigation from "./component/NavBar/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./component/register/Register";
import AllCases from "./component/AllCases/AllCases";
import Login from "./component/login/Login";
import NewCase from "./component/NewCase/NewCase";
import NewDonation from "./component/NewDonation/NewDonation";
import Home from "./component/Home/Home";
import Admin from "./component/Admin/Admin";
function App() {
  const [searchCase, setSearchCase] = useState("");
  const [categoryNav, setCategory] = useState("");
  const [allCase, setAllCase] = useState("");
  const [num, setNum] = useState(1);
  const [numEducation, setNumEducation] = useState(0);
  const [numFood, setNumFood] = useState(0);
  const [numRebuilding, setNumRebuilding] = useState(0);
  const [numMedicalSupplies, setNumMedicalSupplies] = useState(0);

  //--------------------------------- STORE
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [userId, setUserId] = useState("");

  return (
    <>
      <Navigation
        setIsAdmin={setIsAdmin}
        isAdmin={isAdmin}
        setSearchCase={setSearchCase}
        setCategory={setCategory}
        setAllCase={setAllCase}
        userId={userId}
        setUserId={setUserId}
        setNum={setNum}
        numEducation={numEducation}
      />

      <Routes>
        <Route path="admin" element={<Admin searchCase={searchCase} />} />
        <Route
          path="/"
          element={
            <Home
              setCategory={setCategory}
              setAllCase={setAllCase}
              numEducation={numEducation}
              numFood={numFood}
              setNumFood={setNumFood}
              setNumEducation={setNumEducation}
              setNumRebuilding={setNumRebuilding}
              numRebuilding={numRebuilding}
              setNumMedicalSupplies={setNumMedicalSupplies}
              numMedicalSupplies={numMedicalSupplies}
            />
          }
        />

        <Route path="/register" element={<Register />} />
        <Route
          path="/allcases"
          element={
            <AllCases
              setNum={setNum}
              num={num}
              searchCase={searchCase}
              categoryNav={categoryNav}
              allCase={allCase}
              setNumEducation={setNumEducation}
              numEducation={numEducation}
              setNumFood={setNumFood}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsAdmin={setIsAdmin}
              isAdmin={isAdmin}
              setUserId={setUserId}
            />
          }
        />
        <Route
          path="/casedetails/:id"
          element={<NewDonation isAdmin={isAdmin} />}
        />
      </Routes>
    </>
  );
}

export default App;
