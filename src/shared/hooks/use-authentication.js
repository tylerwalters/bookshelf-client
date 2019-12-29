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
    return axios.post(url, { username, password, ttl: -1 }).then(res => {
      setAuthTokenCookie(res.data.id);
    });
  }

  function logout() {
    const url = `${API_URL}/users/logout?access_token=${globalState.auth.token}`;
    return axios.post(url).then(res => {
      setAuthTokenCookie(null);
    });
  }

  function setAuthState(isLoggedIn, token) {
    setGlobalState(curr => ({ ...curr, auth: { isLoggedIn, token } }));
  }

  useEffect(() => {
    const token = getAuthTokenCookie();

    if (token) setAuthState(true, token);
  }, []);

  return {
    isLoggedIn: globalState.auth.loggedIn,
    token: globalState.auth.token,
    login,
    logout
  };
}

export default useAuthentication;
