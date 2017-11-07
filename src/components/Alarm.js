import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import Swiper from 'react-native-swiper';

function calculateMinutesFromAngle(angle) {
  return Math.round(angle / (2 * Math.PI / (12 * 12))) * 5;
}

function calculateHour(angle) {
  const minutes = calculateMinutesFromAngle(angle);
  const h = Math.floor(minutes / 60);

  return h;
}

function calculateMinutes(angle) {
  const minutes = calculateMinutesFromAngle(angle);
  const h = Math.floor(minutes / 60);
  const m = minutes - h * 60;

  return m;
}

function roundAngleToFives(angle) {
  const fiveMinuteAngle = 2 * Math.PI / 144;

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
}

function padMinutes(min) {
  if (`${min}`.length < 2) {
    return `0${min}`;
  }

  return min;
}

export default class Alarm extends Component {
  state = { startAngle: Math.PI * 10 / 6, angleLength: Math.PI * 7 / 6 };

  onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
    this.setState({ minutesLong });
  };

  onUpdate = ({ startAngle, angleLength }) => {
    this.setState({
      startAngle: roundAngleToFives(startAngle),
      angleLength: roundAngleToFives(angleLength)
    });
  };

  render() {
    const { startAngle, angleLength } = this.state;
    const bedtimeHour = calculateHour(startAngle);
    const bedtimeMinutes = calculateMinutes(startAngle);
    const waketimeHour = calculateHour(
      (startAngle + angleLength) % (2 * Math.PI)
    );
    const waketimeMinutes = calculateMinutes(
      (startAngle + angleLength) % (2 * Math.PI)
    );

    return (
      <View style={styles.container}>
        <Text>Alarmm</Text>
        <Text>
          {bedtimeHour}:{padMinutes(bedtimeMinutes)}
        </Text>
        <Text>
          {waketimeHour}:{padMinutes(waketimeMinutes)}
        </Text>
        <CircularSlider
          startAngle={this.state.startAngle}
          angleLength={this.state.angleLength}
          onUpdate={({ startAngle, angleLength }) =>
            this.setState({ startAngle, angleLength })}
          segments={10}
          strokeWidth={30}
          radius={95}
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
