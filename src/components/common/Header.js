import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Switch } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

class Header extends Component {
  state = { trueSwitchIsOn: true };

  componentWillMount() {
    const { trueSwitchIsOn } = this.state;
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

    if (trueSwitchIsOn == true) {
      this.props.toggleAlarmOn();
      this.props.startAlarm(wakeTimeH, wakeTimeM);
      this.props.startPushNotification(bedTimeH, bedTimeM);
    } else {
      this.props.toggleAlarmOff();
    }
  }

  handleChange(value) {
    if (value == true) {
      this.setState({ trueSwitchIsOn: value });
      this.props.toggleAlarmOn();
    } else {
      this.setState({ trueSwitchIsOn: value });
      this.props.toggleAlarmOff();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.enterSettings()}>
          <Image
            style={styles.settingsLink}
            source={require('../../../img/icn-settings.png')}
          />
        </TouchableHighlight>
        <Text style={styles.h1}>ALARM</Text>
        <View>
          <Switch
            onValueChange={value => this.handleChange(value)}
            value={this.state.trueSwitchIsOn}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    alarmToggleOn: state.alarm.alarmToggleOn,
    dbTime: state.alarm.alarmTime
  };
}

export default connect(mapStateToProps, actionCreators)(Header);

const styles = {
  container: {
    alignItems: 'center',
    height: 20,
    width: '100%',
    marginTop: 8,
    marginBottom: 130
  },
  settingsLink: {
    width: 40,
    height: 40,
    right: 25,
    marginLeft: 340,
    top: 17
  },
  h1: {
    fontSize: 25,
    color: 'white',
    fontWeight: '700',
    backgroundColor: 'transparent',
    marginBottom: 15
  }
};
