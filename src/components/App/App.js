import React from 'react';
import { Route, Switch, useHistory  } from 'react-router-dom';
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
          console.log('res: ', res);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  //авторизация
  function onSubmitLogin({email, password}) {
    if (!email || !password) {
      return;
    }
    mainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="page">
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
          <Profile/>
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
    
    </div>
  );
}

export default App;
