import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ savedMovies }) {
  return (
    <section>
      <SearchForm/>
      <MoviesCardList savedMovies={savedMovies}/>
      <Preloader />
    </section>
  );
}

export default Movies;
