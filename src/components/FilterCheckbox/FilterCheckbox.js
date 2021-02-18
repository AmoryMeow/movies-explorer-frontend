import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
     
    <div class="checkbox">  
      <input type="checkbox" value="None" id="filter" name="check" class="checkbox__input" />
      <label for="filter" class="checkbox__label"></label>
    </div>
    
  );
}

export default FilterCheckbox;