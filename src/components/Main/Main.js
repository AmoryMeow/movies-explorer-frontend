import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main() {
  return(
    <main className="content">

      <Promo />

      <AboutProject/>

      <Techs/>

    <section className="aboutMe">
      <h2>Студент</h2>
    </section>

    <section className="portfolio"></section>
  </main>
  )
}

export default Main;