import React, { useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Componetns/Pagination/Pagination";
import FilterBox from "../../Componetns/FilterBox/FilterBox";
import { ProblemContext } from "../../Context/ProblemContext/ProblemContext";
import { FiltersProvider } from "../../Context/FiltersContext/FiltersContext";
import styles from "./ProblemSet.module.css";

function ProblemSet() {
  const [currentProblemPage, setCurrentProblemPage] = useState(0);
  const { filteredProblems, totalPages, pageRange } = useContext(ProblemContext);

  // prettier-ignore
  const paginatedProblems = useMemo(() =>
      filteredProblems.slice(
        currentProblemPage * pageRange,
        currentProblemPage * pageRange + pageRange
      ),
    [currentProblemPage, filteredProblems, pageRange]
  );

  if (!Array.isArray(filteredProblems)) return null;

  return (
    <div className={styles.problemSetWrapper}>
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
            {paginatedProblems.length > 0 ? (
              paginatedProblems.map((problem) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="5">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentProblemPage}
          totalPages={totalPages}
          onPageChange={setCurrentProblemPage}
        />
      </section>
      
      <aside className={styles.filterBoxWrapper}>
        <FiltersProvider>
          <FilterBox />
        </FiltersProvider>
      </aside>
    </div>
  );
}

export default ProblemSet;
