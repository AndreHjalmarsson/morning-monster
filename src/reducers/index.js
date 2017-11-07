import { combineReducers } from 'redux';

import authReducer from './auth_reducer';
import alarmReducer from './alarm_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alarm: alarmReducer
});

export default rootReducer;
