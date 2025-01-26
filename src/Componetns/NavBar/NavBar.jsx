import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/Home">
            <img
              src="../../../public/CSM_MATH_CLUB_LOGO.png"
              alt="Web Logo"
              style={{ width: "100px", aspectRatio: "1/1" }}
            />
            CSMathClub
          </Link>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Home">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/ProblemSet">ProblemSet</Link>
            </li>
            {/*Falta la ruta de Los cursos}*/}
            <li className="nav-item">
              <Link to="/Courses">Courses</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
