import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import Swiper from 'react-native-swiper';

import * as helpers from '../Helpers';

export default class Alarm extends Component {
  state = { startAngle: Math.PI * 10 / 6, angleLength: Math.PI * 7 / 6 };

  onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
    this.setState({ minutesLong });
  };

  onUpdate = ({ startAngle, angleLength }) => {
    this.setState({
      startAngle: helpers.roundAngleToFives(startAngle),
      angleLength: helpers.roundAngleToFives(angleLength)
    });
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
          startAngle={this.state.startAngle}
          angleLength={this.state.angleLength}
          onUpdate={({ startAngle, angleLength }) =>
            this.setState({ startAngle, angleLength })}
          segments={10}
          strokeWidth={30}
          radius={105}
          gradientColorFrom="#ff9800"
          gradientColorTo="#ffcf00"
          showClockFace
          clockFaceColor="#9d9d9d"
          bgCircleColor="#171717"
        />
      </View>
    );
  }
}

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
