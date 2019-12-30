import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/private-route/private-route';
import Home from '../pages/home/home';
import AddBook from '../pages/add-book/add-book';
import Login from '../pages/login/login';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/add-book" component={AddBook} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}
