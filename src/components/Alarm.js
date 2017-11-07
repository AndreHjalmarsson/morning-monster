import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import * as helpers from '../Helpers';

class Alarm extends Component {
  state = { startAngle: Math.PI * 10 / 6, angleLength: Math.PI * 7 / 6 };

  onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
    this.setState({ minutesLong });
  };

  onUpdate = ({ startAngle, angleLength }) => {
    this.setState({
      startAngle,
      angleLength
    });
    this.props.createAlarm(startAngle, angleLength);
    this.props.fetchAlarm();
  };

  render() {
    const { startAngle, angleLength } = this.state;

    const bedtimeHour = helpers.calculateHour(startAngle);
    const bedtimeMinutes = helpers.calculateMinutes(startAngle);
    const waketimeHour = helpers.calculateHour(
      (startAngle + angleLength) % (2 * Math.PI)
    );
    const waketimeMinutes = helpers.calculateMinutes(
      (startAngle + angleLength) % (2 * Math.PI)
    );

    return (
      <View style={styles.container}>
        <Text>Alarmm</Text>
        <Text>
          {bedtimeHour}:{helpers.padMinutes(bedtimeMinutes)}
        </Text>
        <Text>
          {waketimeHour}:{helpers.padMinutes(waketimeMinutes)}
        </Text>
        <CircularSlider
          startAngle={startAngle}
          angleLength={angleLength}
          onUpdate={this.onUpdate}
          segments={10}
          strokeWidth={30}
          radius={105}
          gradientColorFrom="#ff9800"
          gradientColorTo="#ffcf00"
          showClockFace
          clockFaceColor="#9d9d9d"
          bgCircleColor="#171717"
        />
        <Text>{console.log(this.props.fetchedAlarmTime)}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetchedAlarmTime: state.alarm.alarmTime
  };
}

export default connect(mapStateToProps, actionCreators)(Alarm);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
    width: 200
  }
};
