import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Alarm from './Alarm';
import ARScene from './ARScene';
import Settings from './Settings';
import { BackgroundImage } from './common';

class Home extends Component {
  renderAlarmOrCatch() {
    const { activeAlarm, alarmToggleOn, settings } = this.props;

    if (activeAlarm && alarmToggleOn == true) {
      return <ARScene />;
    } else if (settings == true) {
      return <Settings />;
    }
    return (
      <View style={styles.container}>
        <Alarm />
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderAlarmOrCatch()}</View>;
  }
}

function mapStateToProps(state) {
  return {
    activeAlarm: state.alarm.active,
    alarmToggleOn: state.alarm.alarmToggleOn,
    settings: state.alarm.settings
  };
}

export default connect(mapStateToProps, actionCreators)(Home);

const styles = {
  container: {
    flex: 1,
    width: '100%'
  }
};
