import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ savedMovies, onSubmitSearch, movies, isLoading, loadingError, onBookmarkClick, isSavedMovie }) {

  const [shortFilm, setShortFilm] = React.useState(false);

  function onFilterShort(filterOn) {
    setShortFilm(filterOn);
  }

  function filterShortFilm(movies) {
    return movies.filter((item) => {
      return item.duration < 40;
    })
  }

  return (
    <section>
      <SearchForm 
        onSubmitSearch={onSubmitSearch} 
        onFilterShort={onFilterShort}
      />
      
      {isLoading && <Preloader/>}
      
      {!isLoading && loadingError === '' && 
        <MoviesCardList 
          savedMovies={savedMovies}
          movies={shortFilm? filterShortFilm(movies) : movies}
          onBookmarkClick={onBookmarkClick}
          isSavedMovie={isSavedMovie}
        />
      }

      {
        !isLoading && loadingError !== '' && <div className="movies__info">{loadingError}</div>
      }

    </section>
  );
}

export default Movies;
