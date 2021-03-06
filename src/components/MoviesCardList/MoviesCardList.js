import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ savedMovies, movies }) {
  
  return (
    <>
      <section className="cards">
      
      {
        movies.map((movie) => (
          <MoviesCard 
            key={movie.id}
            movie={movie}
          />
        ))
      }

      </section>
      <div className="cards__more">Ещё</div>
    </>
  );
}

export default MoviesCardList;