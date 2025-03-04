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
  const {
    nameFiltred, setNameFiltred,
    minLevel, setMinLevel,
    maxLevel, setMaxLevel,
    category, setCategory,
    tags, setTags
  } = React.useContext(FiltersContext);

  const navigate = useNavigate();

  const handleApplyFilters = () => {
    setTempProblems(() =>
      originalProblems.filter((element) =>
        element.title.toLowerCase().includes(nameFiltred.toLowerCase()) &&
        (minLevel !== -1 ? element.problemLevel >= minLevel : true) &&
        (maxLevel !== -1 ? element.problemLevel <= maxLevel : true) &&
        (category.length > 0 ? category.includes(element.majorTopic) : true) &&
        (tags.length > 0 ? element.tags.some((tag) => tags.includes(tag)) : true)
      )
    );
  };

  /** 
   * Keep the randomizer logic here, but *don’t* render the button in FilterBox. 
   * We'll pass this function down to CategoryFilter instead.
   */
  const handleRandomizer = () => {
    const randomProblem = filteredProblems[
      Math.floor(Math.random() * tempProblems.length)
    ];
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
    // If no category is chosen, clear tags as well
    if (category.length === 0) {
      setTags([]);
    }
  }, [category, setTags]);

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
              className={styles.inputTextSmall}
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
              className={styles.inputTextSmall}
            />
          </div>
        </div>

        {/* Categories & tags (with the randomizer button inside CategoryFilter) */}
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          handleRandomizer={handleRandomizer}
        />

        {/* Apply Filters & Clear All on one row */}
        <div className={styles.buttonRow}>
          <button
            className={styles.button}
            type="button"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleClearAllFilters}
          >
            Clear All
          </button>
        </div>
      </form>
    </section>
  );
}

export default FilterBox;
