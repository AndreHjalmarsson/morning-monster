import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import * as helpers from '../Helpers';
import { Spinner } from './common';
import { BackgroundImage } from './common';
import Header from './common/Header';
import TimeText from './TimeText';

class Alarm extends Component {
  state = { startAngle: Math.PI * 10 / 6, angleLength: Math.PI * 7 / 6 };

  componentDidMount() {
    // this.props.fetchAlarm();
  }

  onUpdate = ({ startAngle, angleLength }) => {
    const { dbTime, alarmToggleOn } = this.props;

    const { bedTime, sleepTime } = dbTime;
    const bedTimeH = helpers.calculateHour(bedTime);
    const bedTimeM = helpers.calculateMinutes(bedTime);
    const wakeTimeH = helpers.calculateHour(
      (bedTime + sleepTime) % (2 * Math.PI)
    );
    const wakeTimeM = helpers.calculateMinutes(
      (bedTime + sleepTime) % (2 * Math.PI)
    );

    this.props.createAlarm(startAngle, angleLength);
    this.props.fetchAlarm();
    alarmToggleOn ? this.props.startAlarm(wakeTimeH, wakeTimeM) : null;
    alarmToggleOn ? this.props.startPushNotification(bedTimeH, bedTimeM) : null;
  };

  render() {
    const { startAngle, angleLength } = this.state;
    const { dbTime } = this.props;

    // if (!dbTime) {
    //   return <Spinner />;
    // }
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <Header />
        <TimeText />
        <CircularSlider
          startAngle={dbTime ? dbTime.bedTime : startAngle}
          angleLength={dbTime ? dbTime.sleepTime : angleLength}
          onUpdate={this.onUpdate}
          segments={10}
          strokeWidth={40}
          radius={120}
          gradientColorFrom="#ff9800"
          gradientColorTo="#ffcf00"
          clockFaceColor="#9d9d9d"
          bgCircleColor="#171717"
        />
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
  }
};
