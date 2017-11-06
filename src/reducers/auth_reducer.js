import {
  AUTH_USER,
  UNAUTH_USER,
  LOADING,
  STOP_LOADING
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
  }
  return state;
}
