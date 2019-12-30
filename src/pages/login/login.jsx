import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Page from '../../components/page/page';
import Text from '../../components/text/text';
import Button from '../../components/button/button';
import Message from '../../components/message/message';

import useAuthentication from '../../shared/hooks/use-authentication';

import styles from './login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isLoggedIn } = useAuthentication({});

  console.log('isLoggedIn: ', isLoggedIn);

  useEffect(() => {
    console.log('isLoggedIn: ', isLoggedIn);
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <Page>
      <h1>Login</h1>

      <div className={styles.form}>
        {error && <Message message={error} variant="error" />}

        <Text
          label="Username"
          name="username"
          onChange={setUsername}
          onBlur={setUsername}
        />
        <Text
          label="Password"
          name="password"
          type="password"
          onChange={setPassword}
          onBlur={setPassword}
        />

        <Button primary onClick={() => login(username, password)}>
          Submit
        </Button>
      </div>
    </Page>
  );
}

export default Login;
