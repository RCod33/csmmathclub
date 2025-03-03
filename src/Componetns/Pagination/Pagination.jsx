import React from "react";
import getPageNumbers from "../../Logic/PaginationLogic/PaginationLogic";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((page, index) =>
        page === "ellipsis" ? (
          <li key={`ellipsis-${index}`} className={styles.ellipsis}>
            ...
          </li>
        ) : (
          <li key={`page_${page}`}>
            <button
              type="button"
              className={page === currentPage ? styles.activePage : ""}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </button>
          </li>
        )
      )}
    </ul>
  );
};

export default Pagination;
