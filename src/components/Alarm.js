import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import { connect } from 'react-redux';
import Svg, { G } from 'react-native-svg';

import * as actionCreators from '../actions';
import * as helpers from '../Helpers';
import { Spinner } from './common';
import { BackgroundImage } from './common';
import Header from './common/Header';
import TimeText from './TimeText';

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

      alarmToggleOn == true ? this.props.startAlarm(wakeTimeH, wakeTimeM) : null;
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
            <Image style={styles.durationIcon} source={require('../../img/icn-timertwo--white4x.png')} />
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
        startIcon={<G transform={{ translate: '-7, -7' }}>{helpers.BEDTIME_ICON}</G>}
        stopIcon={<G transform={{ translate: '-7, -7' }}>{helpers.WAKETIME_ICON}</G>}
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
        startIcon={<G transform={{ translate: '-10, -10' }}>{helpers.BEDTIME_ICON}</G>}
        stopIcon={<G transform={{ translate: '-13.5, -13.5' }}>{helpers.WAKETIME_ICON}</G>}
      />
    );
  }

  render() {
    const { dbTime } = this.props;

    if (!dbTime) {
      return <Spinner />;
    }

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
    width: 16,
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
