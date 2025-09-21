import { useState, useMemo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Componetns/Pagination/Pagination";
import FilterBox from "../../Componetns/FilterBox/FilterBox";
import { ProblemContext } from "../../Context/ProblemContext/ProblemContext";
import { FiltersProvider } from "../../Context/FiltersContext/FiltersContext";
import styles from "./ProblemSet.module.css";

function ProblemSet() {
  const [currentProblemPage, setCurrentProblemPage] = useState(0);
  const { filteredProblems, totalPages, pageRange } = useContext(ProblemContext);

  useEffect(() => {
    if (totalPages === 0 && currentProblemPage !== 0) {
      setCurrentProblemPage(0);
    } else if (totalPages > 0 && currentProblemPage >= totalPages) {
      setCurrentProblemPage(totalPages - 1);
    }
  }, [currentProblemPage, totalPages]);

  const paginatedProblems = useMemo(() => {
    const safeProblems = Array.isArray(filteredProblems) ? filteredProblems : [];

    return safeProblems.slice(
      currentProblemPage * pageRange,
      currentProblemPage * pageRange + pageRange
    );
  }, [currentProblemPage, filteredProblems, pageRange]);

  const renderDataCell = (label, content) => (
    <td data-label={label}>{content}</td>
  );

  return (
    <div className={styles.problemSetWrapper}>
      <section className={styles.problemsContainer}>
        <Pagination
          currentPage={currentProblemPage}
          totalPages={totalPages}
          onPageChange={setCurrentProblemPage}
        />
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
                  {renderDataCell("ID", problem.problemID)}
                  {renderDataCell(
                    "Problem",
                    <Link to="/problem" state={{ currentProblem: problem }}>
                      {problem.title}
                    </Link>
                  )}
                  {renderDataCell("Topic", problem.majorTopic)}
                  {renderDataCell("Difficulty", `Level: ${problem.problemLevel}`)}
                  {renderDataCell(
                    "Week Discussed",
                    problem.weekDiscussed[0] === "0" && problem.weekDiscussed[1] === "0"
                      ? "None"
                      : `S${problem.weekDiscussed[0]} W${problem.weekDiscussed[1]}`
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td data-label="Status" colSpan="5">
                  No results found
                </td>
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
