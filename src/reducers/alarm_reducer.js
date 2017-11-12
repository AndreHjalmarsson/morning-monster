import {
  ALARM_FETCH,
  ALARM_ACTIVATE,
  ALARM_INACTIVATE,
  ALARM_ON,
  ALARM_OFF
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALARM_FETCH:
      return { ...state, alarmTime: action.payload };
    case ALARM_ACTIVATE:
      return { ...state, active: true };
    case ALARM_INACTIVATE:
      return { ...state, active: false };
    case ALARM_ON:
      return { ...state, on: true };
    case ALARM_OFF:
      return { ...state, on: false };
  }
  return state;
}
