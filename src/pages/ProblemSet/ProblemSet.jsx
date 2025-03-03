/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Componetns/Pagination/Pagination";
import FilterBox from "../../Componetns/FilterBox/FilterBox";
import { ProblemContext } from "../../Context/ProblemContext/ProblemContext";
import { FiltersProvider } from "../../Context/FiltersContext/FiltersContext";
import styles from "./ProblemSet.module.css";

//todo: cambiar el nombre de filteredProblems por filtred filteredProblems

function ProblemSet() {
  const [currentProblemPage, setCurrentProblemPage] = useState(0);
  const { filteredProblems, totalPages, pageRange } =
    useContext(ProblemContext);

  if (!Array.isArray(filteredProblems)) return null;

  //prettier-ignore
  const paginatedProblems = useMemo(() =>
      filteredProblems.slice(
        currentProblemPage * pageRange,
        currentProblemPage * pageRange + pageRange
      ),
    [currentProblemPage, filteredProblems, pageRange]
  );

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
                <td>{problem.subTopic}</td>
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
      <FiltersProvider>
        <FilterBox />
      </FiltersProvider>
    </>
  );
}

export default ProblemSet;
