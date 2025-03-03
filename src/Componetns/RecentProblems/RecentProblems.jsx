// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import problemsDataBase from "../../JsonFiles/Problems.json";

function RecentProblems() {
  return (
    <section>
      <h3>Recent Problems</h3>
      <ul>
        {
          // prettier-ignore
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
