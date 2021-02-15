import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
  return(
    <main className="content">

      <Promo />

      <AboutProject/>

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