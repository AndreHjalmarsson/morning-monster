'use strict';

import React, { Component } from 'react';
import { ViroARScene, ViroText } from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    this.state = {
      text: 'Initializing AR...'
    };
  }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized.bind(this)}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text: 'Hello World!'
    });
  }
}

let styles = {
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
};

module.exports = HelloWorldSceneAR;
