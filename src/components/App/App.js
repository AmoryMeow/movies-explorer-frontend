import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="page">
      <Header />

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

      </Switch>
      
      <Footer />
    
    </div>
  );
}

export default App;
