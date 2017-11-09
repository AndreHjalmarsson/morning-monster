import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Alarm from './Alarm';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Alarm />
        <Button title="Logout" onPress={() => this.props.logoutUser()} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAlarm: state.alarm.active
  };
}

export default connect(mapStateToProps, actionCreators)(Home);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
