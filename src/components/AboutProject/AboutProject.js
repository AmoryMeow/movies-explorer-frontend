import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <ul className="project__content">
        <li className="project__content-item">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project__content-item">
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="progress-bar">
        <div className="progress-bar__item progress-bar__item_color_black">1 неделя</div>
        <div className="progress-bar__item progress-bar__item_color_grey">4 недели</div>
        <div className="progress-bar__description">Back-end</div>
        <div className="progress-bar__description">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;