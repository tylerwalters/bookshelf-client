import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Message from '../shared/components/Message';

import { login } from '../modules/user';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends Component {
  state = {
    username: '',
    password: '',
    redirectToReferrer: false,
    showWarning: false
  };

  componentWillReceiveProps(newProps) {
    if (newProps.loginFailed) this.setState({ showWarning: true });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { login } = this.props;

    login(username, password, () =>
      this.setState({ redirectToReferrer: true })
    );
  };

  updateUsername = e => this.setState({ username: e.target.value });

  updatePassword = e => this.setState({ password: e.target.value });

  closeWarning = () => this.setState({ showWarning: false });

  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, showWarning } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <main className={classes.main}>
        <Message
          open={showWarning}
          onClose={this.closeWarning}
          variant="error"
          message="Sign in failed"
        />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={this.updateUsername}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.updatePassword}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
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

const LoginWithStyles = withStyles(styles)(Login);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWithStyles);
