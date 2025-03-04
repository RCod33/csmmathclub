import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navBarContainer}>
      {/* TOP BAR: White */}
      <div className={styles.topBar}>
        {/* Izquierda */}
        <div className={styles.topBarLeftSection}>
          <img
            src="../../../public/CSM_MATH_CLUB_LOGO.png"
            alt="Web Logo"
            className={styles.logo}
          />
          <h1 className={styles.navTitle}>
            <Link to="/Home" className={styles.navLink}>
              CSM Math Club
            </Link>
          </h1>
        </div>
        {/* Derecha */}
        <div className={styles.topBarRightSection}>
          <Link to="/Home" className={styles.navLink}>
            Home
          </Link>
          <Link to="/ProblemSet" className={styles.navLink}>
            Problem Set
          </Link>
          <Link
            to="/Courses"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              alert(
                "Courses page is under construction, sorry for the inconvenience :)"
              );
            }}
          >
            Courses
          </Link>
        </div>
      </div>

      {/* SECOND BAR: SlateBlue */}
      <div className={styles.secondBar}>
        {<div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Coming soon..."
            id="searchBar"
            className={styles.searchBar}
          />
        </div>}
      </div>
    </nav>
  );
}

export default NavBar;
