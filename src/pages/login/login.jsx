import React, { useState, useEffect, useRef } from 'react';

import Page from '../../components/page/page';
import Text from '../../components/text/text';

// import Filters from '../../components/filters/filters';

import useAuthentication from '../../shared/hooks/use-authentication';

// import styles from './home.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const timeoutRef = useRef(null);

  const { login } = useAuthentication({});

  useEffect(() => {}, [username]);

  return (
    <Page>
      <h1>Login</h1>

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
    </Page>
  );
}

export default Login;
