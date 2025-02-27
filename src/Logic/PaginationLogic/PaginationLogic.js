function getPageNumbers(totalPages, currentPage) {
  const pageNumbers = [];

  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 0; i < 5; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("ellipsis");
      pageNumbers.push(totalPages - 2, totalPages - 1);
    } else if (currentPage >= totalPages - 4) {
      pageNumbers.push(0, 1);
      pageNumbers.push("ellipsis");
      for (let i = totalPages - 5; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(0, 1);
      pageNumbers.push("ellipsis");
      pageNumbers.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
      pageNumbers.push("ellipsis");
      pageNumbers.push(totalPages - 2, totalPages - 1);
    }
  }

  return pageNumbers;
}

export default getPageNumbers;
