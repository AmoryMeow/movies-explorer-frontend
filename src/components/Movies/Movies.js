import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ savedMovies }) {
  return (
    <section>
      <SearchForm/>
      <MoviesCardList savedMovies={savedMovies}/>
    </section>
  );
}

export default Movies;
