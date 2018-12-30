import React from 'react';
import { Route } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import PrivateRoute from '../shared/components/PrivateRoute';
import Home from '../home/Home';
import About from '../about';
import Search from '../search/Search';
import Login from '../login/Login';

import './app.css';

const App = () => (
  <div className="App">
    <CssBaseline />

    <PrivateRoute exact path="/" component={Home} />
    <PrivateRoute exact path="/add-new-book" component={Search} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/about" component={About} />
  </div>
);

export default App;
