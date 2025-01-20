import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import ProblemSet from "../ProblemSet/ProblemSet";
import Courses from "../Courses/Courses";

function App() {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/problemset" element={<ProblemSet />} />
        <Route path="/Courses" element={<Courses />} />
      </Routes>
    </main>
  );
}

export default App;
