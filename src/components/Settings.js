import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';

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

  renderHeader() {
    return (
      <View style={styles.iconContainer}>
        <TouchableHighlight onPress={() => this.props.exitSettings()}>
          <Image style={styles.settingsLinkBack} source={require('../../img/icn-cross.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.updateSettings(this.state.email)}>
          <Image style={styles.settingsLinkConfirm} source={require('../../img/icn-checkmark.png')} />
        </TouchableHighlight>
      </View>
    );
  }

  renderButtons() {
    return (
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.signoutButtonContainer}
          style={styles.signoutButtonInner}
          onPress={() => {
            this.props.logoutUser();
            this.props.exitSettings();
          }}
        >
          SIGN OUT
        </Button>
        <Button
          containerStyle={styles.deleteButtonContainer}
          style={styles.deleteButtonInner}
          onPress={() => {
            this.props.deleteUser();
          }}
        >
          DELETE ACCOUNT
        </Button>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <Text style={styles.h1}>EDIT SETTINGS</Text>
        <View style={styles.fieldContainer}>
          <Image style={styles.iconEmail} source={require('../../img/icn-email2x.png')} />
          <TextInput
            style={styles.textField}
            placeholder={this.props.user ? this.props.user.email : null}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            autoCorrect={false}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Image style={styles.iconPassword} source={require('../../img/icn-password2x.png')} />
          <TextInput
            style={styles.textField}
            placeholder="Password"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            secureTextEntry={true}
            autoCorrect={false}
          />
        </View>
        {this.renderButtons()}
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 50
  },
  h1: {
    fontSize: 16,
    color: '#292A30',
    fontWeight: '900',
    backgroundColor: 'transparent',
    marginBottom: 55,
    top: -40
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    width: '75%',
    marginBottom: 10,
    height: 50,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2
  },
  iconEmail: {
    width: 19,
    height: 13,
    left: 25
  },
  iconPassword: {
    width: 14,
    height: 19,
    left: 27
  },
  textField: {
    left: 90
  },
  settingsLinkBack: {
    width: 24,
    height: 24,
    top: 32,
    marginRight: 131.5
  },
  settingsLinkConfirm: {
    width: 28,
    height: 20,
    top: 34,
    marginLeft: 129.5
  },
  buttonsContainer: {
    alignItems: 'center',
    top: 30
  },
  signoutButtonContainer: {
    padding: 10,
    paddingTop: 16,
    height: 50,
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: '#FF5C8D',
    bottom: 10
  },
  signoutButtonInner: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    width: 260,
    height: 50
  },
  deleteButtonContainer: {
    padding: 10,
    paddingTop: 16,
    height: 50,
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: '#D81C5F'
  },
  deleteButtonInner: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    width: 260,
    height: 50
  }
};
