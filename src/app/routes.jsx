import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/private-route/private-route';
import Home from '../pages/home/home';
import Login from '../pages/login/login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <PrivateRoute exact path="/add-new-book" component={Search} /> */}
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}
