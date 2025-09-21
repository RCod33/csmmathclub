import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import problemsData from "../../JsonFiles/Problems.json";

const ProblemContext = createContext();

const ProblemProvider = ({ children }) => {
  const [filteredProblems, setFilteredProblems] = useState(() => [...problemsData]);
  const [totalPages, setTotalPages] = useState(0);
  const pageRange = 30;

  useEffect(() => {
    setTotalPages(Math.ceil(filteredProblems.length / pageRange));
  }, [filteredProblems, pageRange]);

  const contextValue = useMemo(
    () => ({
      filteredProblems,
      setFilteredProblems,
      totalPages,
      pageRange,
    }),
    [filteredProblems, totalPages, pageRange]
  );

  return <ProblemContext.Provider value={contextValue}>{children}</ProblemContext.Provider>;
};

ProblemProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProblemContext, ProblemProvider };
