import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import { connect } from 'react-redux';
import Svg, { G, Path } from 'react-native-svg';

import * as actionCreators from '../actions';
import * as helpers from '../Helpers';
import { Spinner } from './common';
import { BackgroundImage } from './common';
import Header from './common/Header';
import TimeText from './TimeText';

const BEDTIME_ICON = (
  <G>
    <Path d="M11.7,10.5c-3.6,0-6.4-2.9-6.4-6.4c0-0.7,0.1-1.4,0.4-2.1C3.1,2.9,1.2,5.3,1.2,8.1c0,3.6,2.9,6.4,6.4,6.4
      c2.8,0,5.2-1.8,6.1-4.4C13.1,10.4,12.4,10.5,11.7,10.5z" />
  </G>
);

class Alarm extends Component {
  state = { startAngle: Math.PI * 10 / 6, angleLength: Math.PI * 7 / 6 };

  componentWillMount() {
    this.props.fetchAlarm();
  }

  onUpdate = ({ startAngle, angleLength }) => {
    this.props.createAlarm(startAngle, angleLength);
    this.props.fetchAlarm();

    const { dbTime, alarmToggleOn } = this.props;
    if (dbTime) {
      const { bedTime, sleepTime } = dbTime;
      const wakeTimeH = helpers.calculateHour((bedTime + sleepTime) % (2 * Math.PI));
      const wakeTimeM = helpers.calculateMinutes((bedTime + sleepTime) % (2 * Math.PI));

      alarmToggleOn ? this.props.startAlarm(wakeTimeH, wakeTimeM) : null;
    }
  };

  displaySleeptime() {
    const { dbTime, alarmToggleOn } = this.props;
    if (dbTime) {
      const { sleepTime } = dbTime;

      const sleepTimeCount = helpers.calculateMinutesFromAngle(sleepTime);
      const hours = Math.floor(sleepTimeCount / 60);
      const minutes = sleepTimeCount - hours * 60;

      return (
        <View style={styles.durationContainer}>
          <View style={styles.durationUpper}>
            <Image style={styles.durationIcon} source={require('../../img/icn-timer.png')} />
            <Text style={styles.durationText}>Sleep Duration</Text>
          </View>
          <Text style={hours < 7 ? styles.durationTimeWarning : styles.durationTime}>{`${hours}h ${minutes}min`}</Text>
        </View>
      );
    }
  }

  renderDefaultCircle() {
    const { startAngle, angleLength } = this.state;

    return (
      <CircularSlider
        startAngle={startAngle}
        angleLength={angleLength}
        onUpdate={this.onUpdate}
        segments={10}
        strokeWidth={40}
        radius={120}
        showClockFace
        gradientColorFrom="#B2FF59"
        gradientColorTo="#B2FF59"
        clockFaceColor="#9d9d9d"
        bgCircleColor="#D81C5F"
        startIcon={
          <G scale="1.2" transform={{ translate: '-7, -7' }}>
            {BEDTIME_ICON}
          </G>
        }
      />
    );
  }

  renderUserCircle() {
    const { dbTime } = this.props;
    const { sleepTime } = dbTime;

    const sleepTimeCount = helpers.calculateMinutesFromAngle(sleepTime);
    const hours = Math.floor(sleepTimeCount / 60);
    const minutes = sleepTimeCount - hours * 60;
    return (
      <CircularSlider
        startAngle={dbTime ? dbTime.bedTime : startAngle}
        angleLength={dbTime ? dbTime.sleepTime : angleLength}
        onUpdate={this.onUpdate}
        segments={10}
        strokeWidth={40}
        radius={120}
        showClockFace
        gradientColorFrom={dbTime ? (hours < 7 ? '#A00037' : '#B2FF59') : null}
        gradientColorTo={dbTime ? (hours < 7 ? '#A00037' : '#B2FF59') : null}
        clockFaceColor="#9d9d9d"
        bgCircleColor="#D81C5F"
        startIcon={
          <G scale="1.2" transform={{ translate: '-7, -7' }}>
            {BEDTIME_ICON}
          </G>
        }
      />
    );
  }

  render() {
    const { dbTime } = this.props;

    // if (loading) {
    //   return <Spinner />;
    // }

    return (
      <View style={styles.container}>
        <BackgroundImage />
        <Header />
        <TimeText />
        {dbTime ? this.renderUserCircle() : this.renderDefaultCircle()}
        {this.displaySleeptime()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    dbTime: state.alarm.alarmTime,
    alarmToggleOn: state.alarm.alarmToggleOn
  };
}

export default connect(mapStateToProps, actionCreators)(Alarm);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  durationContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  durationUpper: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  durationIcon: {
    width: 20,
    height: 22,
    marginRight: 10
  },
  durationText: {
    color: '#FFFFFF',
    marginTop: 2,
    fontSize: 17
  },
  durationTime: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '200',
    letterSpacing: 2
  },
  durationTimeWarning: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '200',
    letterSpacing: 2
  }
};
