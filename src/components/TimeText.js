import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import * as helpers from '../Helpers';

class TimeText extends Component {
  render() {
    const { dbTime } = this.props;
    if (dbTime) {
      const { bedTime, sleepTime } = dbTime;
      const bedtimeHour = helpers.calculateHour(bedTime);
      const bedtimeMinutes = helpers.calculateMinutes(bedTime);
      const waketimeHour = helpers.calculateHour(
        (bedTime + sleepTime) % (2 * Math.PI)
      );
      const waketimeMinutes = helpers.calculateMinutes(
        (bedTime + sleepTime) % (2 * Math.PI)
      );
      return (
        <View style={styles.timeContainer}>
          <Text style={styles.bedTime}>
            {bedtimeHour}:{helpers.padMinutes(bedtimeMinutes)}
          </Text>
          <Text styles={styles.wakeTime}>
            {waketimeHour}:{helpers.padMinutes(waketimeMinutes)}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.bedtimeContainer}>
            <Image
              style={styles.timeIcons}
              source={require('../../img/icn-moon.png')}
            />
            <Text style={styles.bedtimeText}>10:00</Text>
          </View>
          <View style={styles.waketimeContainer}>
            <Image
              style={styles.timeIcons}
              source={require('../../img/icn-sun.png')}
            />
            <Text style={styles.waketimeText}>05:00</Text>
          </View>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    dbTime: state.alarm.alarmTime
  };
}

export default connect(mapStateToProps, actionCreators)(TimeText);

const styles = {
  container: {
    flexDirection: 'row',
    marginBottom: 20
  },
  bedtimeContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    width: 130,
    borderRadius: 7,
    marginRight: 20
  },
  waketimeContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    width: 130,
    marginLeft: 20,
    borderRadius: 7
  },
  bedtimeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 25,
    marginRight: 10,
    marginTop: 5
  },
  waketimeText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 25,
    marginRight: 10,
    marginTop: 5
  },
  timeIcons: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginRight: 10
  }
};
