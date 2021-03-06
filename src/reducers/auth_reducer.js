import {
  AUTH_USER,
  UNAUTH_USER,
  LOADING,
  STOP_LOADING,
  FETCH_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authed: true };
    case UNAUTH_USER:
      return { ...state, authed: false };
    case LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case FETCH_USER:
      return { ...state, user: action.payload };
  }
  return state;
}
