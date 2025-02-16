import React from "react";
import CategoryFilter from "../CategoryFilter/CAtegoryFilter";

function FilterBox() {
  return (
    <section>
      <form action="">
        <input
          id="filter by name"
          type="text"
          placeholder="Search problem..."
        />
        {/* <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" /> */}
        <CategoryFilter />
        <button type="button">Go</button>
        <button type="button">Randomizer</button>
      </form>
    </section>
  );
}

export default FilterBox;
