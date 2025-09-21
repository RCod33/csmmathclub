import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import categories from "../../JsonFiles/Categories.json";
import Tags from "./Tags";
import styles from "./CategoryFilter.module.css";

function CategoryFilter({ category, setCategory, tags, setTags, handleRandomizer }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleEraseCategory = (eraseCategory) => {
    setCategory((prev) => prev.filter((cat) => cat !== eraseCategory));
  };

  const handleAddCategory = (newCategory) => {
    setCategory((prev) => {
      if (prev.includes(newCategory)) return prev;
      return [...prev, newCategory];
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
      <div className={styles.topRow}>
        <div className={styles.categoriesSection}>
          <div className={styles.selectedCategories}>
            {category.map((element) => (
              <button
                key={`erase-button-${element}`}
                type="button"
                className={styles.selectedButton}
                onClick={() => handleEraseCategory(element)}
              >
                {element} x
              </button>
            ))}
          </div>
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              type="button"
              className={styles.dropdownButton}
              onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
              Categories v
            </button>
            {open && (
              <ul className={styles.menu}>
                {categories.map((catObj) => {
                  const majorTopic = Object.keys(catObj)[0];
                  return (
                    <li key={majorTopic}>
                      <button type="button" onClick={() => handleAddCategory(majorTopic)}>
                        {majorTopic}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <button
          className={styles.randomizerButton}
          type="button"
          onClick={handleRandomizer}
        >
          Randomizer
        </button>
      </div>

      {category.length > 0 && (
        <div className={styles.tagsSection}>
          <Tags category={category} tags={tags} setTags={setTags} />
        </div>
      )}
    </section>
  );
}

CategoryFilter.propTypes = {
  category: PropTypes.array.isRequired,
  setCategory: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  handleRandomizer: PropTypes.func.isRequired,
};

export default CategoryFilter;