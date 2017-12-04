import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { BackgroundImage } from './common';

class Settings extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', email: '', err: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <Button title="Back" onPress={() => this.props.exitSettings()} />
        <TextInput
          style={styles.textField}
          placeholder="Username"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textField}
          placeholder="Email"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
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
        <Button
          title="Logout"
          onPress={() => {
            this.props.logoutUser();
            this.props.exitSettings();
          }}
        />
      </View>
    );
  }
}

export default connect(null, actionCreators)(Settings);

const styles = {
  container: {
    width: '100%',
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
