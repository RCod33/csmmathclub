import React, { createContext, useState, useEffect } from "react";
import problemsData from "../../TEX_to_JSON/JSON_Files/Problems.json";

const ProblemContext = createContext();

const ProblemProvider = ({ children }) => {
  const [filteredProblems, setFilteredProblems] = useState(problemsData);
  const [totalPages, setTotalPages] = useState([]);
  const pageRange = 30;

  useEffect(() => {
    const totalProblems = filteredProblems.length;
    setTotalPages(Math.ceil(totalProblems / pageRange));
  }, [filteredProblems]);

  return (
    <ProblemContext.Provider
      value={{
        filteredProblems,
        setFilteredProblems,
        totalPages,
        pageRange,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};

export { ProblemContext, ProblemProvider };
