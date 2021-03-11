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
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
  
    const initial = JSON.parse(localStorage.getItem('initialMovies'));
    if (initial) {
      setInitialMovies(initial);
    } else {
      moviesApi.getMovies()
      .then((data) => {
        const initialArray = data.map((item) => {
          const imageURL = item.image ? item.image.url : '';
          return {
            ...item, 
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          }
        })

        localStorage.setItem('initialMovies', JSON.stringify(initialArray));
        setInitialMovies(initialArray);
      })
    }
    localStorage.removeItem('savedMovies')
    const saved = JSON.parse(localStorage.getItem('savedMovies'));
    if (saved) {
      setSavedMovies(saved)
    } else {
      mainApi.getMoveis()
      .then((data) => {
        const savedArray = data.map((item) => {
          return {...item, id: item.movieId}
        })
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
    }

  }, [])


  function isSavedMovie(movie) {
    return savedMovies.some((item) => item.id === movie.id)
  }

  function filter(data, query) {
    if (query) {
      const regex = new RegExp(query,'gi');
      let filterData = data.filter((item) => {
        return regex.test(item.nameRU) || regex.test(item.nameEN);
      });
      return filterData;
    }
    return [];
  }

  function onSubmitSearch(query) {
    setQuery(query);
    setFilterMovies(filter(initialMovies, query));
  }

  function onSubmitSearchSaved(query) {
    setQuery(query);
    setFilterSavedMovies(filter(savedMovies, query));
  }

  //избранное
  function onBookmarkClick(movie, isMarked) {
  
    if (isMarked) {
      addMovie(movie);
    } else {
      deleteMovie(movie);
    }
  }

  //удаление из избранного
  function deleteMovie(movie) {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id;
    mainApi.deleteMovies(movieId)
    .then((res) => {
      if (res) {
        const newArray = savedMovies.filter((item) => item.movieId!== res.movieId);
        setSavedMovies(newArray);
      }
    })
    .catch((err) => console.log(err))
  }

  //добавление в избранное
  function addMovie(movie) {
    mainApi.createMovie(movie)
    .then((res) => {
      setSavedMovies([...savedMovies, {...res, id: res.movieId}])
   })
    .catch((err) => console.log(err))
  }
  
  React.useEffect(() => {
    setFilterSavedMovies(filter(savedMovies, query));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies])

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
            movies={filterMovies}
            onSubmitSearch={onSubmitSearch}
            onBookmarkClick={onBookmarkClick}
            isSavedMovie={isSavedMovie}
          />

          <ProtectedRoute exact path="/saved-movies" 
            loggedIn={loggedIn} 
            isLoading={isLoading}
            loadingError={loadingError}
            component={Movies}   
            savedMovies={true}
            movies={filterSavedMovies}
            onSubmitSearch={onSubmitSearchSaved}
            onBookmarkClick={onBookmarkClick}
            isSavedMovie={isSavedMovie}
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
