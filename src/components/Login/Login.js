import React from 'react';
import './Login.css';
import Input from '../Input/Input';
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

import { getErrorText, checkValid } from '../../utils/formValidator';

function Login({onSubmitLogin}) {
  
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });

  function handleInputChange(evt) {
    const { name, value } = evt.target;   
    setFormValues({
      ...formValues,
      [name] : value 
    });
  }

  /** валидация формы **/
  const [errors, setErrors] = React.useState({
    email: {
      required: '',
      minLength: '',
      isEmail: '',
    },
    password: {
      required: '',
      minLength: '',
    },
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);

  React.useEffect(() => {
    const { email, password } = formValues;

    const emailValid = checkValid('email', email);
    const passwordValid = checkValid('password', password);

    setErrors({
      email: emailValid,
      password: passwordValid,
    });

    const isEmailValid = Object.values(emailValid).every((item) => item === '');
    const isPasswordValid = Object.values(passwordValid).every((item) => item === '');
    
    setIsSubmitDisabled(!isEmailValid || !isPasswordValid);   

  }, [formValues]);

   /** действия формы **/
   function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitLogin(formValues);
  }

  return (
    <section className="login">
      <NavLink to="/" className="logo"><img src={logo} alt="Логотип"/></NavLink>
      <h2 className="login__title">Рады видеть!</h2>

      <AuthForm
        name="login"
        submitText="Войти"
        linkText="Регистрация"
        linkSubText="Ещё не зарегистрированы?"
        link="/signup"
        isSubmitDisabled={isSubmitDisabled}
        handleOnSubmit={handleOnSubmit}
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          minLength="5"
          errorText={getErrorText(errors.email)}
          onChange={handleInputChange}
        />  
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="5"
          errorText={getErrorText(errors.password)}
          onChange={handleInputChange}
        /> 
      </AuthForm>

    </section>
  );
}

export default Login;