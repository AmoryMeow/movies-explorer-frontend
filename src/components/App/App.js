import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

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
          <Register/>
        </Route>

        <Route path='/signin'>
          <Login />
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
