import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from '../../modules/user';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedIn = isLoggedIn();

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
