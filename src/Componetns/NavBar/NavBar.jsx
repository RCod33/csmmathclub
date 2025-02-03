import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar bg-body" style={{ padding: "0px" }}>
        <div className={`container-fluid ${styles.logoNavbarCustom}`}>
          <Link to="/Home" className={`navbar-brand `}>
            <img
              src="../../../public/CSM_MATH_CLUB_LOGO.png"
              alt="Web Logo"
              className={styles.logo}
            />
            <h1 className={styles.navTitle}>CSMathClub</h1>
          </Link>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg bg-body"
        style={{ padding: "0px" }}
      >
        <div
          className={`collapse navbar-collapse ${styles.navbarCustom}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Home" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ProblemSet" className={styles.navLink}>
                ProblemSet
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Courses" className={styles.navLink}>
                Courses
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
