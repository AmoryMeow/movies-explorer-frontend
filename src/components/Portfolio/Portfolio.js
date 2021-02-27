import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/AmoryMeow/how-to-learn" className="portfolio__link">
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__arrow">&#129125;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/AmoryMeow/russian-travel" className="portfolio__link">
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__arrow">&#129125;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/AmoryMeow/mesto" className="portfolio__link">
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__arrow">&#129125;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;