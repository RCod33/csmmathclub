import React, { useRef, useState, useEffect, useMemo } from "react";
import categories from "../../JsonFiles/Categories.json";
import styles from "./CategoryFilter.module.css";

function Tags({ tags, setTags }) {
  const [tagNames, setTagNames] = useState("");
  const [open, setOpen] = useState(true);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null); // Referencia al input

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Hace focus en el input
    }
  }, [tags]);

  const createTagList = useMemo(() => {
    return categories
      .flatMap((element) => element.labels)
      .reduce((acc, curr) => {
        if (!acc.includes(curr)) {
          acc.push(curr);
        }
        return acc;
      }, []);
  }, [categories]);

  const handleEraseTag = (eraseTag) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== eraseTag));
  };

  const handleAddTag = (newTag) => {
    setTags((prevTags) => {
      if (prevTags.includes(newTag)) {
        return prevTags;
      }
      return [...prevTags, newTag];
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

  return (
    <div className={styles.selectedTags}>
      <input
        key={"filter by name"}
        className={styles.inputText}
        id="filter by tag"
        type="text"
        value={tagNames}
        ref={inputRef}
        onChange={(event) => {
          setOpen(true);
          setTagNames(event.target.value);
        }}
        placeholder={"Search tag..."}
      />
      {tags.length > 0 &&
        tags.map((element) => (
          <button
            key={`erase-button-${element}`}
            type="button"
            className={styles.selectedButton}
            onClick={() => handleEraseTag(element)}
          >
            {element} ✖
          </button>
        ))}
      {open && (
        <ul ref={dropdownRef} className={styles.menu}>
          {
            //prettier-ignore
            createTagList.filter((element) => tagNames !== "" 
              ? element.toLowerCase().includes(tagNames.toLowerCase()) 
              : true ).map((element) => (
                <li key={element}>
                  <button type="button" onClick={() => handleAddTag(element)}>
                    {element}
                  </button>
                </li>
              ))
          }
        </ul>
      )}
    </div>
  );
}

function CategoryFilter({ category, setCategory, tags, setTags }) {
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
          {categories.map((element) => (
            <li key={element.majorTopic}>
              <button
                type="button"
                onClick={() => handleAddCategory(element.majorTopic)}
              >
                {element.majorTopic}
              </button>
            </li>
          ))}
        </ul>
      )}

      {category.length > 0 && <Tags tags={tags} setTags={setTags} />}
    </section>
  );
}

export default CategoryFilter;
