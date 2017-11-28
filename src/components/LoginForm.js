import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Button from 'react-native-button';

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

  renderButtons() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.signinButtonContainer}
          style={styles.signinButtonInner}
          onPress={this.onLoginPress.bind(this)}
        >
          SIGN IN
        </Button>
        <Text style={styles.alternativeSignin}>OR</Text>
        <Button
          containerStyle={styles.faceButtonContainer}
          style={styles.faceButtonInner}
          onPress={this.onLoginPress.bind(this)}
        >
          SIGN IN VIA FACEBOOK
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <AuthHeader login={true} />
        <TextInput
          style={styles.textField}
          placeholder="USERNAME"
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
        {this.renderButtons()}
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
  buttonsContainer: {
    alignItems: 'center'
  },
  signinButtonContainer: {
    padding: 10,
    paddingTop: 13,
    height: 50,
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: '#B2FF59'
  },
  signinButtonInner: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    width: 260,
    height: 50
  },
  faceButtonContainer: {
    padding: 10,
    paddingTop: 15,
    height: 50,
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: '#3B5898'
  },
  faceButtonInner: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width: 260,
    height: 50
  },
  alternativeSignin: {
    backgroundColor: 'transparent',
    color: 'white',
    marginBottom: 10,
    marginTop: 10
  }
};
