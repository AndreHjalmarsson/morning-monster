import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import CircularSlider from 'react-native-circular-slider';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import * as helpers from '../Helpers';
import { Spinner } from './common';

class Alarm extends Component {
  state = { startAngle: Math.PI * 10 / 6, angleLength: Math.PI * 7 / 6 };

  componentWillMount() {
    this.props.fetchAlarm();
  }

  onUpdate = ({ startAngle, angleLength }) => {
    this.props.createAlarm(startAngle, angleLength);
    this.props.fetchAlarm();
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
          <Button
            title="Aktivera"
            onPress={() =>
              this.props.activateAlarm(
                bedtimeHour,
                bedtimeMinutes,
                waketimeHour,
                waketimeMinutes
              )}
          />
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

  render() {
    const { startAngle, angleLength } = this.state;
    const { dbTime, loading } = this.props;

    if (!dbTime) {
      return <Spinner />;
    } else {
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
}

function mapStateToProps(state) {
  return {
    dbTime: state.alarm.alarmTime,
    loading: state.auth.loading
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
