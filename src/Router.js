import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Settings from './components/Settings';
import { Header } from './components/common';

const RouterComponent = () => {
  return (
    <View style={styles.container}>
      <Router>
        <Stack key="root">
          <Scene
            key="login"
            component={LoginForm}
            title={false}
            hideNavBar={true}
          />
          <Scene key="register" component={RegisterForm} hideNavBar={true} />
        </Stack>
      </Router>
    </View>
  );
};

const styles = {
  container: {
    flex: 1
  }
};

export default RouterComponent;
