import React from 'react';
import './SearchForm.css';
import search from '../../images/search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({onSubmitSearch}) {
  
  const [query, setQuery] = React.useState('');

  function handleOnChange(evt) {
    setQuery(evt.target.value);
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitSearch(query);
  }

  return (
    <section className="search">
      <form name="search" className="search__form" onSubmit={handleOnSubmit}>
        <input className="search__input" placeholder="Фильм" onChange={handleOnChange}/>
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