import { AUTH_USER } from './types';

export function loginUser() {
  return dispatch => {
    dispatch({ type: AUTH_USER });
  };
}
