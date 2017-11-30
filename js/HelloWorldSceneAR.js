'use strict';

import React, { Component } from 'react';
import {
  ViroARScene,
  ViroText,
  ViroSpotLight,
  ViroAmbientLight,
  Viro3DObject
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    this.state = {
      text: 'Monster coming...'
    };
  }

  render() {
    return (
      <ViroARScene onTrackingInitialized={this._onInitialized.bind(this)}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -10]}
          style={styles.helloWorldTextStyle}
        />

        <ViroSpotLight
          position={[0, -0.25, 0]}
          color="#777777"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
        />

        <ViroAmbientLight color="#FF0000" />

        <Viro3DObject
          source={require('./res/MM_export_new/MM_export_new.vrx')}
          resources={[
            require('./res/MM_export_new/Body_bumpV4.jpg'),
            require('./res/MM_export_new/Body_diffV2.jpg'),
            require('./res/MM_export_new/Body_specV2.jpg'),
            require('./res/MM_export_new/claws_spec.jpg'),
            require('./res/MM_export_new/claws.jpg'),
            require('./res/MM_export_new/eyes_spec.jpg'),
            require('./res/MM_export_new/eyes.jpg')
          ]}
          position={[0.0, 0.0, -2]}
          scale={[0.05, 0.05, 0.05]}
          type="VRX"
        />
      </ViroARScene>
    );
  }

  _onInitialized() {
    this.setState({
      text: 'CATCH IT!'
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
