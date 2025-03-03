import React, { createContext, useState } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [nameFiltred, setNameFiltred] = useState("");
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(12);
  const [category, setCategory] = useState([]);

  return (
    <FiltersContext.Provider
      value={{
        nameFiltred,
        setNameFiltred,
        minLevel,
        setMinLevel,
        maxLevel,
        setMaxLevel,
        category,
        setCategory,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
