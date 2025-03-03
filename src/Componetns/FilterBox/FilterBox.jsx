import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import { ProblemContext } from "../../Context/ProblemContext/ProblemContext";
import { FiltersContext } from "../../Context/FiltersContext/FiltersContext";
import originalProblems from "../../JsonFiles/Problems.json";
import styles from "./FilterBox.module.css";

function FilterBox() {
  const [tempProblems, setTempProblems] = useState(originalProblems);
  // prettier-ignore
  const {
    nameFiltred, setNameFiltred, minLevel, setMinLevel, 
    maxLevel, setMaxLevel, category, setCategory,
  } = React.useContext(FiltersContext);
  const { setFilteredProblems } = React.useContext(ProblemContext);
  const navigate = useNavigate();

  //Si en algun momento el boton go no funciona, utiliza el y quieres arreglarlo contrareloj,
  //  en el discord de edgar esta fijado un useEffect

  const handleGo = () => {
    setTempProblems(() => {
      //prettier-ignore
      return originalProblems.filter((element) =>
          element.title.toLowerCase().includes(nameFiltred.toLowerCase()) &&
          element.problemLevel >= minLevel &&
          element.problemLevel <= maxLevel &&
          (category.length > 0 ? category.includes(element.majorTopic) : true)
      );
    });
  };

  const handleRandomizer = () => {
    const randomProblem =
      tempProblems[Math.floor(Math.random() * tempProblems.length)];
    if (randomProblem === undefined) {
      alert("No problems found with the current filters");
      return;
    }
    navigate("/Problem", { state: { currentProblem: randomProblem } });
  };

  const handleClearAllFilters = () => {
    setNameFiltred("");
    setMinLevel(1);
    setMaxLevel(12);
    setCategory([]);
    setTempProblems([...originalProblems]);
  };

  useEffect(() => {
    setFilteredProblems([...tempProblems]);
  }, [tempProblems]);

  return (
    <section className={styles.filterBox}>
      <form>
        <input
          key={"filter by name"}
          className={styles.inputText}
          id="filter by name"
          type="text"
          value={nameFiltred}
          onChange={(event) => setNameFiltred(event.target.value)}
          placeholder={"Search problem..."}
        />
        <div>
          <label htmlFor="filter by min level"> Min lvl:</label>
          <input
            key={"filter by min level"}
            className={styles.inputText}
            id="filter by min level"
            type="text"
            value={minLevel === 1 ? "" : minLevel} //para que no se vea el 1 por defecto
            onChange={(event) => setMinLevel(Number(event.target.value))}
            placeholder="1"
          />
          <label htmlFor="filter by max level"> Max lvl:</label>
          <input
            key={"filter by max level"}
            className={styles.inputText}
            id="filter by max level"
            type="text"
            value={maxLevel === 12 ? "" : maxLevel} //para que no se vea el 1 por defecto
            onChange={(event) => setMaxLevel(Number(event.target.value))}
            placeholder="12"
          />
        </div>
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          setTempProblems={setTempProblems}
          className={styles.categoryFilter}
        />
        {tempProblems.length !== originalProblems.length && (
          <button type="button" onClick={handleClearAllFilters}>
            Clear All
          </button>
        )}
        <button className={styles.button} type="button" onClick={handleGo}>
          Go
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={handleRandomizer}
        >
          Randomizer
        </button>
      </form>
    </section>
  );
}

export default FilterBox;
