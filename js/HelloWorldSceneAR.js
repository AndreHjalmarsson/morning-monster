'use strict';

import React, { Component } from 'react';
import { ViroARScene, ViroText, ViroSpotLight, ViroAmbientLight, Viro3DObject, ViroSound } from 'react-viro';
import { connect } from 'react-redux';

import * as actionCreators from '../src/actions';

class HelloWorldSceneAR extends Component {
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

        <ViroAmbientLight color="#FFFFFF" />

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
          position={[0.0, 0.0, -3]}
          scale={[0.05, 0.05, 0.05]}
          type="VRX"
          onClick={this._onClick.bind(this)}
          physicsBody={{
            type: 'dynamic',
            mass: 1,
            force: { value: [-0.1, 0, 0.1] },
            useGravity: false
          }}
        />
        <ViroSound
          paused={false}
          muted={false}
          source={require('../sounds/zapsplat_fantasy_giant_angry_growl_003_15421.mp3')}
          loop={true}
          volume={1.0}
        />
      </ViroARScene>
    );
  }

  _onClick() {
    this.props.stopAlarm();
  }

  _onInitialized() {
    this.setState({
      text: 'CATCH IT!'
    });
  }
}

export default connect(null, actionCreators)(HelloWorldSceneAR);

let styles = {
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
};
