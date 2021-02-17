import { Link } from 'react-router-dom';
import './AboutMe.css';
import photo from '../../images/aboutme_photo.png';

function AboutMe() {
  return (
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__container">
        <div className="aboutme__student">
          <div className="aboutme__info">
          <h3 className="aboutme__name">Виталий</h3>
          <p className="aboutme__bio">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__story">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
          <ul className="aboutme__links">
            <li className="aboutme__links-item">
              <Link className="aboutme__link" to="/">Facebook</Link>
            </li>
            <li className="aboutme__links-item">
              <Link className="aboutme__link" to="/">Github</Link>
            </li>
          </ul>
        </div>
        <img className="aboutme__photo" src={photo} alt="Фото"/>
      </div>
    </section>

  );
}

export default AboutMe;
