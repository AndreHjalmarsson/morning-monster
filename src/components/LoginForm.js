import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { Spinner } from './common';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', err: '', loading: false };
  }

  onButtonPress() {
    const { username, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => this.props.loginUser())
      .catch(() =>
        this.setState({ err: 'Something went wrong', loading: false })
      );
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <Button title={'LOGIN'} onPress={this.onButtonPress.bind(this)} />;
  }

  renderRegisterButton() {
    return <Button title="Create account" onPress={Actions.register} />;
  }

  render() {
    return (
      <View style={styles.container}>
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
        {this.renderButton()}
        <Text>{this.state.err}</Text>
        {this.renderRegisterButton()}
      </View>
    );
  }
}

connect(null, actionCreators)(LoginForm);

const styles = {
  container: {
    width: '100%',
    backgroundColor: 'pink',
    flex: 1,
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
};
