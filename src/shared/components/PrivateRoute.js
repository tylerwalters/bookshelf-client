import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...props }) => {
  if (props.loggedIn) {
    return <Route {...props} component={Component} />;
  }

  return <Redirect to="/Login" />;
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(PrivateRoute);
