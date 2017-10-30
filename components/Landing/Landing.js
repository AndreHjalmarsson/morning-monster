import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Landing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
