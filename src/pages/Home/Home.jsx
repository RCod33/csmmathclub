import RecentProblems from "../../Componetns/RecentProblems/RecentProblems";
import styles from "./Home.module.css";

function Home() {
  return (
   <div className={styles.homeContainer}>
         <section className={styles.welcomeSection}>
            <h1>Welcome to our club website!</h1>
            <h4>You can find us on Wednesdays at 18-305 from 1:00pm-2:30pm</h4>
            <p>
               The site is still under development, but a fair amount of problems are
               available for you to solve. We hope you enjoy your time here!
            </p>
         </section>

         <aside className={styles.sidebar}>
            <RecentProblems />
         </aside>
    </div>
  );
}

export default Home;
