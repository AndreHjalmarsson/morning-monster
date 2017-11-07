import { ALARM_FETCH } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ALARM_FETCH:
      return { ...state, alarmTime: action.payload };
  }
  return state;
}
