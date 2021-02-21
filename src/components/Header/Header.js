import './Header.css';
import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg'
import { NavLink } from 'react-router-dom';

function Header() {
  return(
    <header className="header">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>
      <nav className="header__menu">
        <NavLink to="/" className="header__menu-item">Регистрация</NavLink>
        <NavLink to="/movies" className="header__menu-item">Фильмы</NavLink>
        <NavLink to="/saved-movies" className="header__menu-item">Сохранённые фильмы</NavLink>
        <button className="header__signin">Войти</button>
        <button className="header__profile">
          <p className="header__profile-text">Аккаунт</p>
          <img src={profile} alt="Аккаунт" className="header__profile-img"/>
        </button>
      </nav>
    </header>
  )
}

export default Header;