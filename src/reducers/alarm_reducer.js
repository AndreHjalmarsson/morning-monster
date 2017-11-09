import { ALARM_FETCH, ALARM_ACTIVATE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALARM_FETCH:
      return { ...state, alarmTime: action.payload };
    case ALARM_ACTIVATE:
      return { ...state, active: true };
  }
  return state;
}
