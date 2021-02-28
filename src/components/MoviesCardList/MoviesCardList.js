import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ savedMovies }) {
  return (
    <>
      <section className="cards">
        <MoviesCard savedMovies={savedMovies} />
        <MoviesCard savedMovies={savedMovies} />
        <MoviesCard savedMovies={savedMovies} />
        <MoviesCard savedMovies={savedMovies} />
        <MoviesCard savedMovies={savedMovies} />
      </section>
      <div className="cards__more">Ещё</div>
    </>
  );
}

export default MoviesCardList;