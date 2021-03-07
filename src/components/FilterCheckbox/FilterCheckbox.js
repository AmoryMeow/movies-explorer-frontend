import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({onFilter}) {

  function handleOnChange(evt) {
    onFilter(evt.target.checked);
  }

  return (
     
    <div className="checkbox">  
      <input type="checkbox" id="filter" name="check" className="checkbox__input" onChange={handleOnChange}/>
      <label htmlFor="filter" className="checkbox__label"></label>
    </div>
    
  );
}

export default FilterCheckbox;