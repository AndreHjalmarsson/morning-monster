import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import navigate from 'react-navigation';

import LoginForm from './LoginForm';
import Registerform from './RegisterForm';

export default class Landing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginForm />
        {/* <Button title={'Register'} onPress={() => navigate('RegisterForm')} /> */}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
