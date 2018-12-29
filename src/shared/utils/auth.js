import Cookies from 'js-cookie';
import axios from 'axios';

import { apiUrl } from './api';

export const isLoggedIn = () => !!Cookies.get('auth_token');

export const setAuthTokenCookie = token => Cookies.set('auth_token', token);

export const getAuthTokenCookie = () => Cookies.get('auth_token');

export const login = (username, password) => {
  return axios
    .post(`${apiUrl}/users/login`, { username, password })
    .then(res => setAuthTokenCookie(res.data.id));
};
