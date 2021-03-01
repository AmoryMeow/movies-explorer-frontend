import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

import mainApi from '../../utils/MainApi';

function App() {
  
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(true);
  const history = useHistory();

  //регистрация
  function onSubmitRegister({name, email, password}) {
    if (!name || !email || !password) {
      return;
    }
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          login(email, password);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  //авторизация
  function login(email, password) {
    mainApi.login(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        getCurrentUser();
        console.log(currentUser);
        history.push('/movies');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  function onSubmitLogin({email, password}) {
    if (!email || !password) {
      return;
    }
    login(email, password);
  }

  function getCurrentUser() {
    const token = localStorage.getItem('token');
    mainApi.getCurrentUser(token)
      .then((res) => {
        if (res) {
          setCurrentUser(res)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* редактирование профиля */
  function handleSaveProfile() {
    const token = localStorage.getItem('token');
  }

  /* выход */
  function handleSignOut() {
      localStorage.removeItem('token');
      setLoggedIn(false);
      setCurrentUser({})
      history.push('/');
  }

  
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      
        { loggedIn && <Header /> }

        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <Movies savedMovies={false}/>
          </Route>

          <Route path="/saved-movies">
            <Movies savedMovies={true}/>
          </Route>

          <Route path="/profile">
            <Profile 
              onSaveProfile={handleSaveProfile} 
              onSignOut={handleSignOut}
            />
          </Route>

            <Route path='/signup'>
            <Register onSubmitRegister={onSubmitRegister}/>
          </Route>

          <Route path='/signin'>
            <Login onSubmitLogin={onSubmitLogin}/>
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      
        { loggedIn && <Footer /> }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
