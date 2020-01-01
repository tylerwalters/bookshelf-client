import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import useAuthentication from '../../shared/hooks/use-authentication';

function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useAuthentication();

  if (isLoggedIn === undefined) return null;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
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
}

PrivateRoute.propTypes = {
  component: PropTypes.node
};

export default PrivateRoute;
