import React, { Component } from 'react';
import { View, Button, PixelRatio, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { ViroSceneNavigator, ViroARSceneNavigator } from 'react-viro';

import * as actionCreators from '../actions';
import InitialARScene from '../../js/HelloWorldSceneAR';

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
      <View style={styles.container}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
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

const styles = {
  container: {
    flex: 1,
    width: '100%'
  }
};
