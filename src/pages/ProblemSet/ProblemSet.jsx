import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Componetns/Pagination/Pagination";
import FilterBox from "../../Componetns/FilterBox/FilterBox";
import problems from "../../TEX_to_JSON/JSON_Files/Problems.json";
import styles from "./ProblemSet.module.css";

const pageRange = 30;
const totalProblems = problems.length;
const totalPages = Math.ceil(totalProblems / pageRange);

function ProblemSet() {
  const [currentProblemPage, setCurrentProblemPage] = useState(0);

  const paginatedProblems = useMemo(
    () =>
      problems.slice(
        currentProblemPage * pageRange,
        currentProblemPage * pageRange + pageRange
      ),
    [currentProblemPage]
  );

  if (!Array.isArray(problems)) return null;

  return (
    <>
      <section className={styles.problemsContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Week Discussed</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProblems.map((problem) => (
              <tr key={problem.problemID}>
                <td>{problem.problemID}</td>
                <td>
                  <Link to="/Problem" state={{ currentProblem: problem }}>
                    {problem.title}
                  </Link>
                </td>
                <td>{problem.majorTopic}</td>
                <td>{`Level: ${problem.problemLevel}`}</td>
                <td>
                  {problem.weekDiscussed[0] === "0" &&
                  problem.weekDiscussed[1] === "0"
                    ? "None"
                    : `S${problem.weekDiscussed[0]} W${problem.weekDiscussed[1]}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentProblemPage}
          totalPages={totalPages}
          onPageChange={setCurrentProblemPage}
        />
      </section>
      <FilterBox />
    </>
  );
}

export default ProblemSet;
