import React, { createContext, useState } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [nameFiltred, setNameFiltred] = useState("");
  const [minLevel, setMinLevel] = useState(-1);
  const [maxLevel, setMaxLevel] = useState(-1);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);

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
        tags,
        setTags,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
