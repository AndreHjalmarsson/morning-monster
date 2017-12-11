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

const WAKETIME_ICON = (
  <G>
    <G>
      <Path d="M22.58,11.269c-6.237,0-11.311,5.075-11.311,11.312s5.074,11.312,11.311,11.312c6.236,0,11.311-5.074,11.311-11.312
			S28.816,11.269,22.58,11.269z" />
      <G>
        <G>
          <Path d="M22.58,7.944c-1.219,0-2.207-0.988-2.207-2.206V2.207C20.373,0.988,21.361,0,22.58,0c1.219,0,2.207,0.988,2.207,2.207
					v3.531C24.787,6.956,23.798,7.944,22.58,7.944z" />
        </G>
        <G>
          <Path d="M22.58,37.215c-1.219,0-2.207,0.988-2.207,2.207v3.53c0,1.22,0.988,2.208,2.207,2.208c1.219,0,2.207-0.988,2.207-2.208
					v-3.53C24.787,38.203,23.798,37.215,22.58,37.215z" />
        </G>
        <G>
          <Path d="M32.928,12.231c-0.861-0.862-0.861-2.259,0-3.121l2.497-2.497c0.861-0.861,2.259-0.861,3.121,0
					c0.862,0.862,0.862,2.26,0,3.121l-2.497,2.497C35.188,13.093,33.791,13.093,32.928,12.231z" />
        </G>
        <G>
          <Path d="M12.231,32.93c-0.862-0.863-2.259-0.863-3.121,0l-2.497,2.496c-0.861,0.861-0.862,2.26,0,3.121
					c0.862,0.861,2.26,0.861,3.121,0l2.497-2.498C13.093,35.188,13.093,33.79,12.231,32.93z" />
        </G>
        <G>
          <Path d="M37.215,22.58c0-1.219,0.988-2.207,2.207-2.207h3.531c1.219,0,2.207,0.988,2.207,2.207c0,1.219-0.988,2.206-2.207,2.206
					h-3.531C38.203,24.786,37.215,23.799,37.215,22.58z" />
        </G>
        <G>
          <Path d="M7.944,22.58c0-1.219-0.988-2.207-2.207-2.207h-3.53C0.988,20.373,0,21.361,0,22.58c0,1.219,0.988,2.206,2.207,2.206
					h3.531C6.956,24.786,7.944,23.799,7.944,22.58z" />
        </G>
        <G>
          <Path d="M32.928,32.93c0.862-0.861,2.26-0.861,3.121,0l2.497,2.497c0.862,0.86,0.862,2.259,0,3.12s-2.259,0.861-3.121,0
					l-2.497-2.497C32.066,35.188,32.066,33.791,32.928,32.93z" />
        </G>
        <G>
          <Path d="M12.231,12.231c0.862-0.862,0.862-2.259,0-3.121L9.734,6.614c-0.862-0.862-2.259-0.862-3.121,0
					c-0.862,0.861-0.862,2.259,0,3.12l2.497,2.497C9.972,13.094,11.369,13.094,12.231,12.231z" />
        </G>
      </G>
    </G>
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
        stopIcon={
          <G scale="0.2" transform={{ translate: '-22, -22' }}>
            {WAKETIME_ICON}
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
        stopIcon={
          <G scale="0.2" transform={{ translate: '-22, -22' }}>
            {WAKETIME_ICON}
          </G>
        }
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
