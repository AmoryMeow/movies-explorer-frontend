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

  /*** статус загрузки ***/
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState('');

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

  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [shortFilm, setShortFilm] = React.useState(false);
  const [updateMovies, setUpdateMovies]= React.useState(false);
  const [updateSavedMovies, setUpdateSavedMovies]= React.useState(false);

  React.useEffect(() => {

    Promise.all([moviesApi.getMovies(), mainApi.getMoveis()])
      .then((allData) => {
        const [initial, saved] = allData;

        const initialArray = initial.map((item) => {
          const movieId = item.id;
          const movie = saved.find((savedMovie) => {
            return savedMovie.movieId === movieId;
          });
          if (movie) {
            return {...item, saved: true}
          } else {
            return {...item, saved: false}
          }
        });

        const savedArray = saved.map((item) => {
          return {...item, id: item.movieId}
        })

        localStorage.setItem('initialMovies', JSON.stringify(initialArray));
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));

      })
      .catch((err) => {
        console.log('err: ', err);
      })
  }, [])
  
  function filterMovies(data, query, shortFilm) {
    const regex = new RegExp(query,'gi');
    let filterData = data.filter((item) => {
      return shortFilm ? item.duration < 40 : true && (regex.test(item.nameRU) || regex.test(item.nameEN));
    });
    return filterData;
  }

  React.useEffect(() => {

    if (updateMovies) {
      const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));
      const filterData = filterMovies(initialMovies, query, shortFilm);
      setMovies(filterData);
      setUpdateMovies(false);
    }

    if (updateSavedMovies) {
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const filterData = filterMovies(savedMovies, query, shortFilm);
      setSavedMovies(filterData);
      setUpdateSavedMovies(false);
    }

  }, [updateMovies, updateSavedMovies]);


  function onSubmitSearch(query) {
    setQuery(query);
    setUpdateMovies(true);
  }

  function onSubmitSearchSaved(query) {
    setQuery(query);
    setUpdateSavedMovies(true);
  }

  function onFilterShort(filterOn) {
    setShortFilm(filterOn);
    setUpdateMovies(true);
  }

  function onFilterShortSaved(filterOn) {
    setShortFilm(filterOn);
    setUpdateSavedMovies(true);
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
            isLoading={isLoading}
            loadingError={loadingError}
            component={Movies}   
            savedMovies={false} 
            movies={movies}
            onSubmitSearch={onSubmitSearch}
            onFilterShort={onFilterShort}
          />

          <ProtectedRoute exact path="/saved-movies" 
            loggedIn={loggedIn} 
            isLoading={isLoading}
            loadingError={loadingError}
            component={Movies}   
            savedMovies={true}
            movies={savedMovies}
            onSubmitSearch={onSubmitSearchSaved}
            onFilterShort={onFilterShortSaved}
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
