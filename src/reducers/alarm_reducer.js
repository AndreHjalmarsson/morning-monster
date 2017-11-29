import {
  ALARM_FETCH,
  ALARM_ACTIVATE,
  ALARM_INACTIVATE,
  ALARM_ON,
  ALARM_OFF,
  SETTINGS_ENTER,
  SETTINGS_EXIT
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
      return { ...state, alarmToggleOn: true };
    case ALARM_OFF:
      return { ...state, alarmToggleOn: false };
    case SETTINGS_ENTER:
      return { ...state, settings: true };
    case SETTINGS_EXIT:
      return { ...state, settings: false };
  }
  return state;
}
