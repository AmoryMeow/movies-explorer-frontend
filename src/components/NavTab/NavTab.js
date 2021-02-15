import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <ul className="nav">
      <li className="nav__item">
        <Link to="/" className="nav__link">О проекте</Link>
      </li>
      <li className="nav__item">
        <Link to="/" className="nav__link">Технологии</Link>
      </li>
      <li className="nav__item">
        <Link to="/" className="nav__link">Студент</Link>
      </li>
    </ul>
  )
}

export default NavTab;