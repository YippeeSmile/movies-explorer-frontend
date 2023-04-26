import React from "react";
import './FilterSearch.css';

function FilterSearch({checkboxStatus, onChangeCheckbox}) {
  return (
    <div className="filter-search">
      <label className="filter-search__switch">
	      <input type="checkbox"
        checked={checkboxStatus}
        onChange={onChangeCheckbox}
        className="filter-search__checkbox" />
	      <span className="filter-search__slider"></span>
      </label>
      <p className="filter-search__item">Короткометражки</p>
    </div>
  )
}

export default FilterSearch;