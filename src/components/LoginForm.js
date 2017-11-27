import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableHighlight
} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { Spinner } from './common';
import { BackgroundImage } from './common';
import AuthHeader from './common/AuthHeader';

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
        <AuthHeader login={true} />
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
    flex: 1,
    alignItems: 'center'
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  navContainer: {
    flexDirection: 'row'
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
  },
  topText: {
    fontSize: 55,
    fontWeight: '900',
    marginTop: 100,
    marginBottom: 3,
    color: 'white',
    backgroundColor: 'transparent'
  },
  sloganText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: '200',
    fontSize: 17,
    marginBottom: 30
  },
  navText: {
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: 15,
    marginRight: 15,
    fontSize: 20,
    fontWeight: '900'
  },
  navTextCurrent: {
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 40,
    fontSize: 20,
    fontWeight: '900',
    color: '#B2FF59'
  },
  navImgWrapper: {
    width: 265,
    height: 10
  },
  navImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 7
  }
};
