import { AUTH_USER, UNAUTH_USER, LOADING, STOP_LOADING } from './types';

export function loginUser() {
  return dispatch => {
    dispatch({ type: AUTH_USER });
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch({ type: UNAUTH_USER });
  };
}

export function startLoading() {
  return dispatch => {
    dispatch({ type: LOADING });
  };
}

export function stopLoading() {
  return dispatch => {
    dispatch({ type: STOP_LOADING });
  };
}
