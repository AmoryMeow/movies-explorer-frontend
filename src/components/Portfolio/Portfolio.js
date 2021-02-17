import { Link } from 'react-router-dom';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link to="/" className="portfolio__link">
            <p className="portfolio__text">Статичный сайт</p>
            <img src={arrow} alt="Стрелка" />
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="/" className="portfolio__link">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img src={arrow} alt="Стрелка" />
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="/" className="portfolio__link">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img src={arrow} alt="Стрелка" />
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;