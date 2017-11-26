import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { BackgroundImage } from './common';

class Settings extends Component {
  render() {
    return (
      <View>
        <BackgroundImage />
        <Text>HIII</Text>
        <Button title="Back" onPress={() => this.props.exitSettings()} />
        <Button title="Logout" onPress={() => this.props.logoutUser()} />
      </View>
    );
  }
}

export default connect(null, actionCreators)(Settings);
