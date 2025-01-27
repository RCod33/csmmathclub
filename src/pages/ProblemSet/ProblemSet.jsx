import React from "react";
import { Link } from "react-router-dom";
import problems from "../../TEX_to_JSON/JSON_Files/Problems.json";

function ProblemSet() {
  if (!Array.isArray(problems)) return null;

  return (
    <section className="container-fluid">
      {problems.map((currentProblem) => (
        <div className="row" key={currentProblem.problemID}>
          <div className="col">
            <ul>
              <li>{currentProblem.problemID}</li>
              <li>
                <Link to="/Problem" state={{ currentProblem: currentProblem }}>
                  {currentProblem.title}
                </Link>
              </li>
              <li>{currentProblem.majorTopic}</li>
              <li>{currentProblem.problemLevel}</li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProblemSet;
