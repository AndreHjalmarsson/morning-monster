import React, { Component } from 'react';
import { Text, View, TextInput, Button, Image } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { Spinner } from './common';
import { BackgroundImage } from './common';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', err: '' };
  }

  onLoginPress() {
    const { username, password } = this.state;

    this.props.startLoading();

    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        this.props.loginUser();
        this.props.stopLoading();
      })
      .catch(() => {
        this.setState({ err: 'Something went wrong' });
        this.props.stopLoading();
      });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return <Button title={'LOGIN'} onPress={this.onLoginPress.bind(this)} />;
  }

  renderRegisterButton() {
    return <Button title="Create account" onPress={Actions.register} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
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

function mapStateToProps(state) {
  return {
    loading: state.auth.loading
  };
}

export default connect(mapStateToProps, actionCreators)(LoginForm);

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
