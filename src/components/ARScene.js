import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  PixelRatio,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { ViroSceneNavigator, ViroARSceneNavigator } from 'react-viro';
import * as actionCreators from '../actions';

let InitialARScene = require('../../js/HelloWorldSceneAR');

let sharedProps = {
  apiKey: '74544290-1284-420A-B9BC-54DE4C1D5461'
};

class ARScene extends Component {
  constructor() {
    super();

    this.state = { sharedProps: sharedProps };
  }

  render() {
    return (
      <View>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
        <Button title="Catch!!!!" onPress={() => this.props.stopAlarm()} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAlarm: state.alarm.active
  };
}

export default connect(mapStateToProps, actionCreators)(ARScene);
