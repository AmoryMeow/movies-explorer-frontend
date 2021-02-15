import './Main.css';
import Promo from '../Promo/Promo';

function Main() {
  return(
    <main className="content">

      <Promo />

    <section className="aboutProject">
      <h2>О проекте</h2>
      <ul>
        <li>
          <h3>Дипломный проект включал 5 этапов</h3>
          <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li>
          <h3>На выполнение диплома ушло 5 недель</h3>
          <p>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
    </section>

    <section className="techs">
      <h2>Технологии</h2>
      <h3>7 технологий</h3>
      <p>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>React</li>
        <li>Git</li>
        <li>Express.js</li>
        <li>mongoDB</li>
      </ul>
    </section>

    <section className="aboutMe">
      <h2>Студент</h2>
    </section>

    <section className="portfolio"></section>
  </main>
  )
}

export default Main;