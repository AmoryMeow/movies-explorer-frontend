import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ savedMovies, onSubmitSearch, movies  }) {
  console.log('movies: ', movies);
  return (
    <section>
      <SearchForm 
        onSubmitSearch={onSubmitSearch} 
      />
      <MoviesCardList 
        savedMovies={savedMovies}
        movies={movies}
      />
    </section>
  );
}

export default Movies;
