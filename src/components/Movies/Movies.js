import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ savedMovies, onSubmitSearch, movies, isLoading, loadingError, onFilterShort }) {
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
          movies={movies}
        />
      }

      {
        !isLoading && loadingError !== '' && <div className="movies__info">{loadingError}</div>
      }

    </section>
  );
}

export default Movies;
