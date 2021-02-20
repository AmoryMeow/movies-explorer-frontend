import bookmark from '../../images/bookmark.svg';
import card from '../../images/card.png';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <article class="card">
      <div class="card__container">
        <div className="card__heading">
          <h2 class="card__title">33 слова о дизайне</h2>
          <p class="card__duration">1ч 47м</p>
        </div>
        <button class="card__bookmark">
          <svg width="10" height="14" viewBox="0 0 10 14" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 1.9C0.5 1.40294 0.902944 1 1.4 1H8.6C9.09706 1 9.5 1.40294 9.5 1.9V12.4789C9.5 12.5552 9.41798 12.6034 9.35133 12.5662L6.21676 10.8198C5.46033 10.3984 4.53968 10.3984 3.78324 10.8198L0.648671 12.5662C0.582015 12.6034 0.5 12.5552 0.5 12.4789V1.9Z" stroke="#E8E8E8"/>
          </svg>
        </button>
      </div>
      <img src={card} alt="Обложка"/>
    </article>
  );
}

export default MoviesCard;