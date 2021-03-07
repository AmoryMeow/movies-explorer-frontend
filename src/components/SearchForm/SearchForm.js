import React from 'react';
import './SearchForm.css';
import search from '../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({onSubmitSearch, onFilterShort}) {
  
  const [query, setQuery] = React.useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);

  function handleOnChange(evt) {
    setQuery(evt.target.value);
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitSearch(query);
  }

  React.useEffect(() => {
    setIsSubmitDisabled(query === '');
  }, [query])

  return (
    <section className="search">
      <form name="search" className="search__form" onSubmit={handleOnSubmit}>
        <input required className="search__input" placeholder="Фильм" onChange={handleOnChange}/>
        <button className={`search__button ${isSubmitDisabled && 'search__button_disabled'}`} disabled={isSubmitDisabled}>
          <img className="search__img" src={search} alt="Искать"/>
        </button>
      </form>
      <div className="search__short">
        <FilterCheckbox onFilter={onFilterShort}/>
        <p className="search__filter-text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;