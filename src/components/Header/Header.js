import { NavLink } from 'react-router-dom';
import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import profile from '../../images/profile.svg'


function Header() {
  
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  
  function handleOpenMenu() {
    setMenuIsOpen(true);
  }

  function handleCloseMenu() {
    setMenuIsOpen(false);
  }
  return(
    <header className="header">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>

      <div className="header__container"> 
        <nav className="header__auth ">
          <NavLink to="/signup" className="header__signup">Регистрация</NavLink>
          <NavLink to="/signin" className="header__signin">Войти</NavLink>
        </nav>
        <div className={`header__cover ${!menuIsOpen && 'header__cover_hidden'}`}>
          <nav className="header__menu">
            <NavLink to="/" className="header__menu-item" onClick={handleCloseMenu}>Главная</NavLink>
            <NavLink to="/movies" className="header__menu-item" activeClassName="header__menu-item_active" onClick={handleCloseMenu}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className="header__menu-item" activeClassName="header__menu-item_active" onClick={handleCloseMenu}>Сохранённые фильмы</NavLink>
            <NavLink to="/profile" className="header__profile" onClick={handleCloseMenu}>
              <p className="header__profile-text">Аккаунт</p>
              <img src={profile} alt="Аккаунт" className="header__profile-img"/>
            </NavLink>
            <div className="header__close-menu" onClick={handleCloseMenu}>
              <div className="header__cross"></div>
            </div>
          </nav>
        </div>
        <div className="header__open-menu" onClick={handleOpenMenu}>
          <div className="header__line"></div>
        </div>
        
      </div>
      
    </header>
  )
}

export default Header;