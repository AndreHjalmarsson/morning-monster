import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import * as helpers from '../Helpers';
import { Spinner } from './common';

class Alarm extends Component {
  state = { startAngle: Math.PI * 10 / 6, angleLength: Math.PI * 7 / 6 };

  componentDidMount() {
    this.props.fetchAlarm();
  }

  onUpdate = ({ startAngle, angleLength }) => {
    const { dbTime, alarmOn } = this.props;

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
    alarmOn ? this.props.startAlarm(wakeTimeH, wakeTimeM) : null;
    alarmOn ? this.props.startPushNotification(bedTimeH, bedTimeM) : null;
  };

  renderTimeText() {
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
        <View>
          <Text>
            {bedtimeHour}:{helpers.padMinutes(bedtimeMinutes)}
          </Text>
          <Text>
            {waketimeHour}:{helpers.padMinutes(waketimeMinutes)}
          </Text>
          {this.renderAlarmButton()}
        </View>
      );
    } else {
      return (
        <View>
          <Text>10:00</Text>
          <Text>05:00</Text>
        </View>
      );
    }
  }

  renderAlarmButton() {
    const { alarmOn } = this.props;
    if (!alarmOn) {
      return (
        <Button title="Aktivera" onPress={() => this.props.toggleAlarmOn()} />
      );
    } else {
      return (
        <Button
          title="Inaktivera"
          onPress={() => this.props.toggleAlarmOff()}
        />
      );
    }
  }

  render() {
    const { startAngle, angleLength } = this.state;
    const { dbTime } = this.props;

    if (!dbTime) {
      return <Spinner />;
    }
    return (
      <View style={styles.container}>
        {this.renderTimeText()}
        <CircularSlider
          startAngle={dbTime ? dbTime.bedTime : startAngle}
          angleLength={dbTime ? dbTime.sleepTime : angleLength}
          onUpdate={this.onUpdate}
          segments={10}
          strokeWidth={30}
          radius={105}
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
    alarmOn: state.alarm.on
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
