import React, { useRef, useState, useEffect } from "react";
import styles from "./CategoryFilter.module.css";

function CategoryFilter({ category, setCategory }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleEraseCategory = (eraseCategory) => {
    setCategory((prevCategory) =>
      prevCategory.filter((element) => element !== eraseCategory)
    );
  };

  const handleAddCategory = (newCategory) => {
    setCategory((prevCategory) => {
      if (prevCategory.includes(newCategory)) {
        return prevCategory;
      }
      return [...prevCategory, newCategory];
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //todo: add a button to erase all categories
  //todo: fix the dropdown menu to close when clicking inside the dropdown

  return (
    <section className={styles.container}>
      <div className={styles.selectedCategories}>
        {category.map((element) => (
          <button
            key={`erase-button-${element}`}
            type="button"
            className={styles.selectedButton}
            onClick={() => handleEraseCategory(element)}
          >
            {element} ✖
          </button>
        ))}
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          Categorys &#9660;
        </button>
      </div>
      {open && (
        <ul ref={dropdownRef} className={styles.menu}>
          {[
            "Algebra",
            "Calculus",
            "Combinatorics",
            "Number Theory",
            "Geometry",
            "Miscellaneous",
          ].map((element) => (
            <li key={element}>
              <button type="button" onClick={() => handleAddCategory(element)}>
                {element}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CategoryFilter;
