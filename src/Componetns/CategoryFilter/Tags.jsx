import { useRef, useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import categories from "../../JsonFiles/Categories.json";
import styles from "./CategoryFilter.module.css";

function Tags({ category, tags, setTags }) {
  const [tagNames, setTagNames] = useState("");
  const [open, setOpen] = useState(true);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tags]);

  const createTagList = useMemo(() => {
    return categories
      .filter((element) => category.includes(Object.keys(element)[0]))
      .flatMap((element) => Object.values(element)[0])
      .filter((tag, index, self) => self.indexOf(tag) === index);
  }, [category]);

  const handleEraseTag = (eraseTag) => {
    setTags((prev) => prev.filter((tag) => tag !== eraseTag));
  };

  const handleAddTag = (newTag) => {
    setTags((prev) => {
      if (prev.includes(newTag)) return prev;
      return [...prev, newTag];
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
        className={styles.inputText}
        id="filterByTag"
        type="text"
        value={tagNames}
        ref={inputRef}
        onChange={(event) => {
          setOpen(true);
          setTagNames(event.target.value);
        }}
        placeholder="Search tag..."
      />
      {tags.length > 0 &&
        tags.map((t) => (
          <button
            key={`tag-${t}`}
            type="button"
            className={styles.selectedButton}
            onClick={() => handleEraseTag(t)}
          >
            {t} ✖
          </button>
        ))}

      {open && (
        <ul ref={dropdownRef} className={styles.menu}>
          {createTagList
            .filter((element) =>
              tagNames !== ""
                ? element.toLowerCase().includes(tagNames.toLowerCase())
                : true
            )
            .map((element) => (
              <li key={element}>
                <button type="button" onClick={() => handleAddTag(element)}>
                  {element}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
Tags.propTypes = {
  category: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
};

export default Tags;
