import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
   return (
   <>
      {/* TOP BAR: White */}
      {/* Izquierda */}
      <div className={styles.topBar}>
         <div className={styles.topBarLeftSection}>
            <img
               src="../../../public/CSM_MATH_CLUB_LOGO.png"
               alt="Web Logo"
               className={styles.logo}
            />
            <h1 className={styles.navTitle}>CSM Math Club</h1>
         </div>
         {/* Derecha */}
         <div className={styles.topBarRightSection}>
            <Link to="/Home" className={styles.navLink}>Home</Link>
            <Link to="/ProblemSet" className={styles.navLink}>Problem Set</Link>
            <Link to="/Courses" className={styles.navLink}>Courses</Link>
         </div>
      </div>

      {/* SECOND BAR: SlateBlue */}
      <div className={styles.secondBar}>
         <div className={styles.searchContainer}>
            <input 
               type="text" 
               placeholder="Search..." 
               className={styles.searchBar}
            />
         </div>
      </div>
   </>
  );
}

export default NavBar;
