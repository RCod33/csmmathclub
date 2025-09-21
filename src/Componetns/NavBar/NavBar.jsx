import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCoursesClick = (event) => {
    event.preventDefault();
    alert("Courses page is under construction, sorry for the inconvenience :)");
  };

  return (
    <nav className={styles.navBarContainer}>
      <div className={styles.topBar}>
        <div className={styles.topBarLeftSection}>
          <img
            src="/CSM_MATH_CLUB_LOGO.PNG"
            alt="CSM Math Club Logo"
            className={styles.logo}
          />
          <h1 className={styles.navTitle}>
            <Link to="/" className={styles.navLink}>
              CSM Math Club
            </Link>
          </h1>
        </div>

        <div className={styles.topBarRightSection}>
          <Link to="/home" className={styles.navLink}>
            Home
          </Link>
          <Link to="/problemset" className={styles.navLink}>
            Problem Set
          </Link>
          <Link to="/courses" className={styles.navLink} onClick={handleCoursesClick}>
            Courses
          </Link>
        </div>

        <button
          className={styles.mobileMenuToggle}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/home" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/problemset"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Problem Set
          </Link>
          <Link
            to="/courses"
            className={styles.navLink}
            onClick={(event) => {
              handleCoursesClick(event);
              setIsMenuOpen(false);
            }}
          >
            Courses
          </Link>
        </div>
      )}

      <div className={styles.secondBar}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Coming soon..."
            id="searchBar"
            className={styles.searchBar}
          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;