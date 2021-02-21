import './Register.css';
import Input from '../Input/Input';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Register() {
  return (
    <section className="register">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" action="post" name="register" noValidate>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
        />  
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
        />  
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          errorText="Что-то пошло не так..."
        />  
        <button className="register__submit">Зарегистрироваться</button>
        <p className="register__text">Уже зарегистрированы? <NavLink className="register__link" to="/signin">Войти</NavLink></p>
      </form>
    </section>
  );
}

export default Register;