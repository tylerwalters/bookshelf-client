import React from 'react';
import { Route, Link } from 'react-router-dom';

import PrivateRoute from '../shared/components/PrivateRoute';
import Header from '../header/Header';
import Home from '../home/Home';
import About from '../about';
import Search from '../search/Search';
import Login from '../login/Login';

import './app.css';

const App = () => (
  <div className="App">
    <Header />

    <main className="main-content">
      <Route exact path="/" component={Home} />
      <Route exact path="/add-books" component={Search} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />
    </main>
  </div>
);

export default App;
