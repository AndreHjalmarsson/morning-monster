import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Actions } from 'react-native-router-flux';

class AuthHeader extends Component {
  render() {
    const { reg, login } = this.props;
    return (
      <View style={styles.topContainer}>
        <Text style={styles.topText}>WAKIE</Text>
        <Text style={styles.sloganText}>Awesome slogan here</Text>
        <View style={styles.navContainer}>
          <TouchableHighlight onPress={reg ? () => Actions.pop() : null}>
            <Text style={login ? styles.navTextCurrent : styles.navText}>
              SIGN IN
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={login ? Actions.register : null}>
            <Text style={reg ? styles.navTextCurrent : styles.navText}>
              SIGN UP
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.navImgWrapper}>
          <Image
            style={login ? styles.navImage : styles.navImageRotate}
            source={require('../../../img/nav-login.png')}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, actionCreators)(AuthHeader);

const styles = {
  topContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  navContainer: {
    flexDirection: 'row'
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
    marginLeft: 25,
    marginRight: 25,
    fontSize: 20,
    fontWeight: '900'
  },
  navTextCurrent: {
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: 25,
    marginRight: 25,
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
  },
  navImageRotate: {
    transform: [{ rotate: '180deg' }],
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 7
  }
};
