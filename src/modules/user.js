import Cookies from 'js-cookie';
import axios from 'axios';

import { apiUrl } from '../shared/utils/api';

export const LOGIN_REQUESTED = 'user/LOGIN_REQUESTED';
export const LOGIN = 'user/LOGIN';
export const LOGIN_FAILED = 'user/LOGIN_FAILED';

export const isLoggedIn = () => !!Cookies.get('auth_token');

export const setAuthTokenCookie = token => Cookies.set('auth_token', token);

export const getAuthTokenCookie = () => Cookies.get('auth_token');

const initialState = {
  loggedIn: isLoggedIn(),
  token: getAuthTokenCookie(),
  isLoggingIn: false,
  loginFailed: false
};

export default (state = initialState, action) => {
  const resetState = {
    ...state,
    isLoggingIn: false,
    loginFailed: false
  };

  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...resetState,
        isLoggingIn: true
      };
    case LOGIN:
      return {
        ...resetState,
        token: action.token,
        loggedIn: true,
        isLoggingIn: false
      };
    case LOGIN_FAILED:
      return {
        ...resetState,
        loginFailed: true
      };
    default:
      return state;
  }
};

export const login = (username, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUESTED
    });

    return axios
      .post(`${apiUrl}/users/login`, { username, password })
      .then(res => {
        const token = res.data.id;

        setAuthTokenCookie(token);

        dispatch({
          type: LOGIN,
          token
        });
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          dispatch({
            type: LOGIN_FAILED
          });
        }
      });
  };
};
