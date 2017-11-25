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
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAlarm: state.alarm.active
  };
}

export default connect(mapStateToProps, actionCreators)(ARScene);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
