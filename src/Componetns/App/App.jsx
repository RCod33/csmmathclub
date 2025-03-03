/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../../Componetns/NavBar/NavBar";
import Home from "../../pages/Home/Home";
import ProblemSet from "../../pages/ProblemSet/ProblemSet";
import Problem from "../../pages/Problems/Problem";
import Courses from "../../pages/Courses/Courses";
import { ProblemProvider } from "../../Context/ProblemContext/ProblemContext"; // Importa el Provider

function App() {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route
          path="/problemset"
          element={
            <ProblemProvider>
              <ProblemSet />
            </ProblemProvider>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/problem" element={<Problem />} />
      </Routes>
    </main>
  );
}

export default App;
