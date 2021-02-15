import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
      <Header />

      <Switch>

        <Route path="/">
          <Main />
        </Route>
        
      </Switch>
      
      <Footer />
    
    </div>
  );
}

export default App;
