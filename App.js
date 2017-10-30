import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Landing from './components/Landing/Landing';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Open up App.js to start working on your application as another thing!
        </Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Landing />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
