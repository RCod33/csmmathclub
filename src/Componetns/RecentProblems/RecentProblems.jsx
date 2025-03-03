// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import problemsDataBase from "../../JsonFiles/Problems.json";
import styles from "./RecentProblem.module.css"; // Import CSS

function RecentProblems() {
  return (
    <section className={styles.recentProblemsBox}>
      <h3>Recent Problems</h3>
      <ul className={styles.recentProblemsList}>
        {
          problemsDataBase.slice(-7).reverse().map((problem) => (
            <li key={`recent-problem-${problem.problemID}`}>
              <Link to="/Problem" state={{ currentProblem: problem }}>
                {problem.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default RecentProblems;
