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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';


function App() {

  /*** авторизация, регистрация ***/
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

  // получить данные текущего пользователя 
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

  // редактирование профиля 
  function handleSaveProfile(data) {
    
    mainApi.saveProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
      })
      .catch((err) => console.log(err))
  }

  // выход 
  function handleSignOut() {
      localStorage.removeItem('token');
      setLoggedIn(false);
      setCurrentUser({})
      history.push('/');
  }

  /*** поиск фильма ***/

  const [initialMoveis, setInitialMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [query, setQuery] = React.useState('');
  
  React.useEffect(() => {
    filterMovies(initialMoveis, query)
  }, [initialMoveis, query]);

  function filterMovies(data, query) {
    const regex = new RegExp(query,'gi');
    const filterArray = data.filter((item) => {
      return regex.test(item.nameRU) || regex.test(item.nameEn);
    });
    setMovies(filterArray);
  }

  function onSubmitSearch(query) {
    moviesApi.getMovies()
    .then((data) => {
      if (data) {
        setInitialMovies(data);
        setQuery(query);
      }
    })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      
        { (loggedIn || location.pathname === '/') && <Header loggedIn={loggedIn}/> }

        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute exact path="/movies" 
            loggedIn={loggedIn} 
            component={Movies}   
            savedMovies={false} 
            onSubmitSearch={onSubmitSearch}   
            movies={movies}
          />

          <ProtectedRoute exact path="/saved-movies" 
            loggedIn={loggedIn} 
            component={Movies}   
            savedMovies={true}
          />

          <ProtectedRoute exact path="/profile" 
            loggedIn={loggedIn} 
            component={Profile}   
            onSaveProfile={handleSaveProfile} 
            onSignOut={handleSignOut}
          />

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
