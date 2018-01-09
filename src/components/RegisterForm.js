import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

import { BackgroundImage } from './common';
import AuthHeader from './common/AuthHeader';

export default class RegisterForm extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', err: '' };
  }

  onRegisterButtonPress() {
    const { username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .catch(() => this.setState({ err: 'Something went wrong...' }));
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <AuthHeader reg={true} />
        <TextInput
          style={styles.textField}
          placeholder="EMAIL"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textField}
          placeholder="PASSWORD"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          autoCorrect={false}
        />
        <Button
          containerStyle={styles.registerButtonContainer}
          style={styles.registerButtonInner}
          onPress={this.onRegisterButtonPress.bind(this)}
        >
          REGISTER
        </Button>
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
    width: '75%',
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 40
  },
  registerButtonContainer: {
    padding: 10,
    paddingTop: 13,
    height: 50,
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: '#B2FF59'
  },
  registerButtonInner: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292A30',
    width: 260,
    height: 50
  }
};
