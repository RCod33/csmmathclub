import React, { useState } from "react";
import styles from "./CategoryFilter.module.css"; // Importamos el CSS Module

const SubCategoryFilter = () => {
  const [open, setOpen] = useState(false);
  const [subCategory, setSubCategory] = useState("Sub Category");

  const handleSubCategory = (newSubCategory) => {
    setSubCategory(newSubCategory);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen((prev) => !prev)}
      >
        {subCategory}
      </button>
      {open && (
        <ul className={styles.menu}>
          <li>
            <button type="button" onClick={() => handleSubCategory("Lorem")}>
              Lorem
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleSubCategory("Ipsum")}>
              Ipsum
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleSubCategory("Dolor")}>
              Dolor
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

const CategoryFilter = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Category");

  const handleCategory = (newCategory) => {
    setCategory(newCategory);
    setOpen(false); // Cierra el menú al seleccionar una categoría
  };

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          setOpen((prev) => !prev);
          setCategory("Category");
        }}
      >
        {category}
      </button>
      {open && (
        <ul className={styles.menu}>
          <li>
            <button type="button" onClick={() => handleCategory("Algebra")}>
              Algebra
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleCategory("Analysis")}>
              Analysis
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleCategory("Number Theory")}
            >
              Number Theory
            </button>
            <button type="button" onClick={() => handleCategory("Cunilingus")}>
              Cunilingus
            </button>
          </li>
        </ul>
      )}
      {category !== "Category" && <SubCategoryFilter />}
    </>
  );
};

export default CategoryFilter;
