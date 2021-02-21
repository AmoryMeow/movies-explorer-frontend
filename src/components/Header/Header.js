import './Header.css';
import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg'
import { NavLink } from 'react-router-dom';

function Header() {
  return(
    <header className="header">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>
      <nav className="header__menu">
        <NavLink to="/signup" className="header__menu-item">Регистрация</NavLink>
        <NavLink to="/movies" className="header__menu-item">Фильмы</NavLink>
        <NavLink to="/saved-movies" className="header__menu-item">Сохранённые фильмы</NavLink>
        <NavLink to="/signin" className="header__signin">Войти</NavLink>
        <NavLink to="/profile" className="header__profile">
          <p className="header__profile-text">Аккаунт</p>
          <img src={profile} alt="Аккаунт" className="header__profile-img"/>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header;