import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import { ProblemContext } from "../../Context/ProblemContext/ProblemContext";
import { FiltersContext } from "../../Context/FiltersContext/FiltersContext";
import originalProblems from "../../JsonFiles/Problems.json";
import styles from "./FilterBox.module.css";

function FilterBox() {
  const { filteredProblems, setFilteredProblems } = React.useContext(ProblemContext);
  const [tempProblems, setTempProblems] = useState(originalProblems);
  // prettier-ignore
  const {
    nameFiltred, setNameFiltred,
    minLevel, setMinLevel,
    maxLevel, setMaxLevel,
    category, setCategory,
    tags, setTags
  } = React.useContext(FiltersContext);
  const navigate = useNavigate();

  const handleGo = () => {
    setTempProblems(() => {
      return originalProblems.filter((element) =>
        element.title.toLowerCase().includes(nameFiltred.toLowerCase()) &&
        (minLevel !== -1 ? element.problemLevel >= minLevel : true) &&
        (maxLevel !== -1 ? element.problemLevel <= maxLevel : true) &&
        (category.length > 0 ? category.includes(element.majorTopic) : true) &&
        (tags.length > 0 ? element.tags.some((tag)=> tags.includes(tag)) : true)
      );
    });
  };

  const handleRandomizer = () => {
    const randomProblem = filteredProblems[Math.floor(Math.random() * tempProblems.length)];
    if (!randomProblem) {
      alert("No problems found with the current filters");
      return;
    }
    navigate("/Problem", { state: { currentProblem: randomProblem } });
  };

  const handleClearAllFilters = () => {
    setNameFiltred("");
    setMinLevel(-1);
    setMaxLevel(-1);
    setCategory([]);
    setTags([]);
    setTempProblems([...originalProblems]);
  };

  useEffect(() => {
    setFilteredProblems([...tempProblems]);
  }, [tempProblems, setFilteredProblems]);

  return (
    <section className={styles.filterBox}>
      <form id="filterForm" className={styles.filterForm}>

        {/* Search input */}
        <input
          className={styles.inputText}
          type="text"
          value={nameFiltred}
          onChange={(e) => setNameFiltred(e.target.value)}
          placeholder="Search problem..."
        />

        {/* Min/Max level side by side */}
        <div className={styles.levelInputs}>
          <div className={styles.minMaxInput}>
            <label htmlFor="minLevel">Min lvl:</label>
            <input
              id="minLevel"
              type="text"
              value={minLevel === -1 ? "" : minLevel}
              onChange={(e) => setMinLevel(Number(e.target.value))}
              placeholder="0"
              className={styles.inputText}
            />
          </div>

          <div className={styles.minMaxInput}>
            <label htmlFor="maxLevel">Max lvl:</label>
            <input
              id="maxLevel"
              type="text"
              value={maxLevel === -1 ? "" : maxLevel}
              onChange={(e) => setMaxLevel(Number(e.target.value))}
              placeholder="12"
              className={styles.inputText}
            />
          </div>
        </div>

        {/* Category filter */}
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          setTempProblems={setTempProblems}
          tags={tags}
          setTags={setTags}
          className={styles.categoryFilter}
        />

        {/* Two buttons in one row */}
        <div className={styles.buttonRow}>
          <button className={styles.button} type="button" onClick={handleGo}>
            Apply Filters
          </button>
          <button className={styles.button} type="button" onClick={handleClearAllFilters}>
            Clear All
          </button>
        </div>

        {/* Randomizer on its own row (or move it above if you prefer) */}
        <button className={styles.button} type="button" onClick={handleRandomizer}>
          Randomizer
        </button>
      </form>
    </section>
  );
}

export default FilterBox;
