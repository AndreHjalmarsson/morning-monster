import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Alarm from './Alarm';
import ARScene from './ARScene';

class Home extends Component {
  renderAlarmOrCatch() {
    const { activeAlarm, alarmOn } = this.props;

    if (activeAlarm && alarmOn === true) {
      return <ARScene />;
    }
    return (
      <View>
        <Alarm />
        <Button title="Logout" onPress={() => this.props.logoutUser()} />
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
    alarmOn: state.alarm.on
  };
}

export default connect(mapStateToProps, actionCreators)(Home);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
