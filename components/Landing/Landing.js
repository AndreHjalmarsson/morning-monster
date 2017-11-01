import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class Landing extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textField}
          placeholder="Username"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput
          style={styles.textField}
          placeholder="Password"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    borderColor: 'white',
    width: '70%',
    marginBottom: 10,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 7
  }
});
