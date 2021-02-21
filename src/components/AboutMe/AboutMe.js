import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import photo from '../../images/aboutme_photo.png';

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <SectionTitle
        title="Студент"
      />
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
              <a className="aboutme__link" href="/">Facebook</a>
            </li>
            <li className="aboutme__links-item">
              <a className="aboutme__link" href="https://github.com/AmoryMeow/">Github</a>
            </li>
          </ul>
        </div>
        <img className="aboutme__photo" src={photo} alt="Фото"/>
      </div>
    </section>

  );
}

export default AboutMe;
