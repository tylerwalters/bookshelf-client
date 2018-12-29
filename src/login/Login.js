import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../modules/user';

import './login.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { login } = this.props;

    login(username, password);
  };

  updateUsername = e => this.setState({ username: e.target.value });

  updatePassword = e => this.setState({ password: e.target.value });

  render() {
    return (
      <div id="Login">
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input type="text" id="username" onChange={this.updateUsername} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              onChange={this.updatePassword}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  token: state.user.token,
  isLoggingIn: state.user.isLoggingIn,
  loginFailed: state.user.loginFailed
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
