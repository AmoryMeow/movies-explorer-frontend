import './Header.css';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Header() {
  return(
    <header className="header">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>
      <nav className="header__menu">
        <NavLink to="/" className="header__menu-item">Регистрация</NavLink>
        <button className="header__signin">Войти</button>
      </nav>
    </header>
  )
}

export default Header;