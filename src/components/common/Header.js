import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.settingsLink}
          source={require('../../../img/settings-24-512.png')}
        />
      </View>
    );
  }
}

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
    right: 0
  }
};

export { Header };
