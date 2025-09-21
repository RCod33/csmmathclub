import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import { ProblemContext } from "../../Context/ProblemContext/ProblemContext";
import { FiltersContext } from "../../Context/FiltersContext/FiltersContext";
import originalProblems from "../../JsonFiles/Problems.json";
import styles from "./FilterBox.module.css";

function FilterBox() {
  const { setFilteredProblems } = useContext(ProblemContext);
  const [tempProblems, setTempProblems] = useState(originalProblems);
  const {
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
  } = useContext(FiltersContext);

  const navigate = useNavigate();

  const handleApplyFilters = useCallback(() => {
    const nextProblems = originalProblems.filter((problem) => {
      const nameMatches = problem.title
        .toLowerCase()
        .includes(nameFiltred.toLowerCase());
      const minMatches = minLevel !== -1 ? problem.problemLevel >= minLevel : true;
      const maxMatches = maxLevel !== -1 ? problem.problemLevel <= maxLevel : true;
      const categoryMatches =
        category.length > 0 ? category.includes(problem.majorTopic) : true;
      const tagsMatch =
        tags.length > 0 ? problem.tags.some((tag) => tags.includes(tag)) : true;

      return nameMatches && minMatches && maxMatches && categoryMatches && tagsMatch;
    });

    setTempProblems(nextProblems);
  }, [category, maxLevel, minLevel, nameFiltred, tags]);

  const handleRandomizer = () => {
    if (tempProblems.length === 0) {
      alert("No problems found with the current filters");
      return;
    }

    const randomProblem = tempProblems[Math.floor(Math.random() * tempProblems.length)];
    navigate("/problem", { state: { currentProblem: randomProblem } });
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
    if (category.length === 0) {
      setTags([]);
    }
  }, [category, setTags]);

  useEffect(() => {
    setFilteredProblems([...tempProblems]);
  }, [tempProblems, setFilteredProblems]);

  const handleLevelChange = (setter) => (event) => {
    const { value } = event.target;
    if (value === "") {
      setter(-1);
      return;
    }
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      setter(parsed);
    }
  };

  return (
    <section className={styles.filterBox}>
      <form id="filterForm" className={styles.filterForm}>
        <input
          className={styles.inputText}
          type="text"
          value={nameFiltred}
          onChange={(event) => setNameFiltred(event.target.value)}
          placeholder="Search problem..."
        />

        <div className={styles.levelInputs}>
          <div className={styles.minMaxInput}>
            <label htmlFor="minLevel">Min lvl:</label>
            <input
              id="minLevel"
              type="number"
              min="0"
              value={minLevel === -1 ? "" : minLevel}
              onChange={handleLevelChange(setMinLevel)}
              placeholder="0"
              className={styles.inputTextSmall}
            />
          </div>

          <div className={styles.minMaxInput}>
            <label htmlFor="maxLevel">Max lvl:</label>
            <input
              id="maxLevel"
              type="number"
              min="0"
              value={maxLevel === -1 ? "" : maxLevel}
              onChange={handleLevelChange(setMaxLevel)}
              placeholder="12"
              className={styles.inputTextSmall}
            />
          </div>
        </div>

        <CategoryFilter
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          handleRandomizer={handleRandomizer}
        />

        <div className={styles.buttonRow}>
          <button className={styles.button} type="button" onClick={handleApplyFilters}>
            Apply Filters
          </button>
          <button className={styles.button} type="button" onClick={handleClearAllFilters}>
            Clear All
          </button>
        </div>
      </form>
    </section>
  );
}

export default FilterBox;
