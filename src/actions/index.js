import firebase from 'firebase';

import {
  AUTH_USER,
  UNAUTH_USER,
  LOADING,
  STOP_LOADING,
  ALARM_FETCH
} from './types';

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

export function createAlarm(bedTime, sleepTime) {
  return dispatch => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/alarm`)
      .set({ bedTime, sleepTime });
  };
}

export function fetchAlarm() {
  return dispatch => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/alarm`)
      .on('value', snapshot => {
        dispatch({ type: ALARM_FETCH, payload: snapshot.val() });
      });
  };
}
