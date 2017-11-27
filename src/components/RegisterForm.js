import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { BackgroundImage } from './common';
import AuthHeader from './common/AuthHeader';

export default class RegisterForm extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', err: '' };
  }

  onButtonPress() {
    const { username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .catch(() => this.setState({ err: 'Something went wrong' }));
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <AuthHeader reg={true} />
        <TextInput
          style={styles.textField}
          placeholder="Username"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textField}
          placeholder="Password"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          autoCorrect={false}
        />
        <Button title={'Register'} onPress={this.onButtonPress.bind(this)} />
        <Text>{this.state.err}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center'
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
};
