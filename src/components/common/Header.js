import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Switch } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.enterSettings()}>
          <Image
            style={styles.settingsLink}
            source={require('../../../img/icn-settings.png')}
          />
        </TouchableHighlight>
        <Switch />
      </View>
    );
  }
}

export default connect(null, actionCreators)(Header);

const styles = {
  container: {
    height: 20,
    width: '100%',
    marginTop: 25,
    marginBottom: 100
  },
  settingsLink: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 25,
    top: 5
  }
};
