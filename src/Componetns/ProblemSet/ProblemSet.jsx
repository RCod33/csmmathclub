import React from "react";
import { Link } from "react-router-dom";
import problems from "/src/TEX_to_JSON/JSON_Files/Problems.json";

function ProblemSet() {
  return (
    <section className="container-fluid">
      {problems.map((currentProblem) => (
        <div className="row" key={currentProblem.id}>
          <div className="col">
            <ul>
              <li>{currentProblem.id}</li>
              <li>
                <Link to="/Problem" state={{ currntProblem: currentProblem }}>
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
