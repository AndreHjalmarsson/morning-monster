import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class Landing extends Component {
  constructor() {
    super();
    this.state = { textValue: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Landing</Text>
        <TextInput
          placeholder="Enter"
          value={this.state.textValue}
          onChangeText={text => this.setState({ textValue: text })}
        />
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
