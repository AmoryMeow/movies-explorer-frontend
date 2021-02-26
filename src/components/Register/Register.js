import './Register.css';
import Input from '../Input/Input';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <section className="register">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>

      <AuthForm
        name="register"
        submitText="Зарегистрироваться"
        linkText="Войти"
        linkSubText="Уже зарегистрированы?"
        link="/signin"
      >
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          errorText=""
        />  
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          errorText="Что-то пошло не так..."
        />  
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          errorText="Что-то пошло не так..."
        /> 
      </AuthForm>

    </section>
  );
}

export default Register;