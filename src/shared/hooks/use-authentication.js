import { useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { GlobalContext } from '../context/global';

import { API_URL } from '../constants/api';

function useAuthentication() {
  const [globalState, setGlobalState] = useContext(GlobalContext);

  function getAuthTokenCookie() {
    return Cookies.get('auth_token');
  }

  function setAuthTokenCookie(token) {
    return Cookies.set('auth_token', token);
  }

  function login(username, password) {
    const url = `${API_URL}/users/login`;
    return axios
      .post(url, { username, password, ttl: -1 })
      .then(res => {
        setAuthTokenCookie(res.data.id);
        setAuthState({ isLoggedIn: true, token: res.data.id });
      })
      .catch(err =>
        setAuthState({ isLoggedIn: false, error: 'Login failed.' })
      );
  }

  function logout() {
    const url = `${API_URL}/users/logout?access_token=${globalState.auth.token}`;
    return axios.post(url).then(res => {
      setAuthTokenCookie(null);
    });
  }

  function setAuthState(auth) {
    setGlobalState(curr => ({ ...curr, auth }));
  }

  useEffect(() => {
    const token = getAuthTokenCookie();

    if (token) {
      setAuthState({ isLoggedIn: true, token });
    } else {
      setAuthState({ isLoggedIn: false });
    }
  }, []);

  return {
    isLoggedIn: globalState.auth.isLoggedIn,
    token: globalState.auth.token,
    error: globalState.auth.error,
    login,
    logout
  };
}

export default useAuthentication;
