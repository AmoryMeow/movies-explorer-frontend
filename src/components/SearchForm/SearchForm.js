import './SearchForm.css';
import search from '../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search">
      <form name="search" className="search__form">
        <input className="search__input" placeholder="Фильм"/>
        <button className="search__button">
          <img className="search__img" src={search} alt="Искать"/>
        </button>
      </form>
      <div className="search__short">
        <FilterCheckbox/>
        <p className="search__filter-text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;