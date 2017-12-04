import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
  TouchableHighlight,
  Image,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import { BackgroundImage } from './common';

class Settings extends Component {
  constructor() {
    super();
    this.state = { password: '', email: '', err: '' };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <View style={styles.iconContainer}>
          <TouchableHighlight onPress={() => this.props.exitSettings()}>
            <Image
              style={styles.settingsLinkBack}
              source={require('../../img/icn-settings.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.updateSettings(this.state.email)}
          >
            <Image
              style={styles.settingsLinkConfirm}
              source={require('../../img/icn-moon.png')}
            />
          </TouchableHighlight>
        </View>
        <Text>SETTINGS</Text>
        <TextInput
          style={styles.textField}
          placeholder={this.props.user ? this.props.user.email : null}
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

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actionCreators)(Settings);

const styles = {
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center'
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 100
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
  settingsLinkBack: {
    width: 40,
    height: 40,
    top: 25,
    marginRight: 125
  },
  settingsLinkConfirm: {
    width: 40,
    height: 40,
    top: 25,
    marginLeft: 125
  }
};
