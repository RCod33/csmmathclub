import React from "react";
import { Link } from "react-router-dom";
import problemsDataBase from "../../TEX_to_JSON/JSON_Files/Problems_2.json";

function RecentProblems() {
  return (
    <section>
      <h3>Recent Problems</h3>
      <ul>
        {
          // prettier-ignore
          problemsDataBase.slice(-7).reverse().map((problem) => (
            <li key={problem.id}>
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
