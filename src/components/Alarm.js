import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import CircularSlider from 'react-native-circular-slider';
import Swiper from 'react-native-swiper';

export default class Alarm extends Component {
  constructor() {
    super();
    this.state = { startAngle: 0, angleLength: 2 };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Alarmm</Text>
        <CircularSlider
          startAngle={this.state.startAngle}
          angleLength={this.state.angleLength}
          onUpdate={({ startAngle, angleLength }) =>
            this.setState({ startAngle, angleLength })}
          segments={5}
          strokeWidth={40}
          radius={145}
          gradientColorFrom="#ff9800"
          gradientColorTo="#ffcf00"
          showClockFace
          clockFaceColor="#9d9d9d"
          bgCircleColor="#171717"
        />
        <Text>{this.state.startAngle}</Text>
        <Text>{this.state.angleLength}</Text>
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
