import React, { Component } from 'react';
import { View, AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';
import firebase from 'firebase';
import { connect } from 'react-redux';

import * as actionCreators from './actions';
import Landing from './components/Landing';
import Home from './components/Home';
import PushController from './components/PushController';
import * as helpers from './Helpers';

import { BackgroundImage } from './components/common';

class Root extends Component {
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAqBrGHxkelJc8Dgxk-wdPUTyIrWHkAvgk',
      authDomain: 'morning-monster.firebaseapp.com',
      databaseURL: 'https://morning-monster.firebaseio.com',
      projectId: 'morning-monster',
      storageBucket: 'morning-monster.appspot.com',
      messagingSenderId: '423602998161'
    });
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    const { alarmToggleOn, dbTime } = this.props;

    const { bedTime, sleepTime } = dbTime;
    const bedTimeH = helpers.calculateHour(bedTime);
    const bedTimeM = helpers.calculateMinutes(bedTime);
    const wakeTimeH = helpers.calculateHour((bedTime + sleepTime) % (2 * Math.PI));
    const wakeTimeM = helpers.calculateMinutes((bedTime + sleepTime) % (2 * Math.PI));

    const sleepPushTimer = helpers.startSleepPushNotificationTimer(bedTimeH, bedTimeM);
    const wakePushTimer = helpers.startWakePushNotificationTimer(wakeTimeH, wakeTimeM);

    if (appState === 'background' && alarmToggleOn) {
      PushNotification.localNotificationSchedule({
        message: 'Time to go to sleep',
        date: new Date(Date.now() + sleepPushTimer)
      });
      PushNotification.localNotificationSchedule({
        message: 'Silence the monster',
        date: new Date(Date.now() + wakePushTimer)
      });
    }
  }

  renderHome() {
    if (this.props.authed) {
      return <Home />;
    } else {
      return <Landing />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHome()}
        <PushController />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    authed: state.auth.authed,
    alarmToggleOn: state.alarm.alarmToggleOn,
    dbTime: state.alarm.alarmTime
  };
}

export default connect(mapStateToProps, actionCreators)(Root);

const styles = {
  container: {
    flex: 1
  }
};
