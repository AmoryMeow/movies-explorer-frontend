import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  let location = useLocation();
 
  //проверка токена
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token')
          history.push('/');
        });
    }
  }, []);

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

  /* получить данные текущего пользователя */
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
  function handleSaveProfile(data) {
    
    mainApi.saveProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
      })
      .catch((err) => console.log(err))
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
      
        { (loggedIn || location.pathname === '/') && <Header loggedIn={loggedIn}/> }

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
      
        { (loggedIn || location.pathname === '/') && <Footer /> }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
