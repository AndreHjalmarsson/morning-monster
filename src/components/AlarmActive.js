import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class AlarmActive extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Catch!!" onPress={() => this.props.stopAlarm()} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAlarm: state.alarm.active
  };
}

export default connect(mapStateToProps, actionCreators)(AlarmActive);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
